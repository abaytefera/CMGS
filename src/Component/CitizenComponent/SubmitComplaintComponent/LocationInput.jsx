import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import L from 'leaflet';

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LocationInput({ label, required, name }) {
  const { Language } = useSelector((state) => state.webState);
  const [address, setAddress] = useState("");
  const [locationDetails, setLocationDetails] = useState({ sub_city: "", woreda: "" });
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([9.0016, 38.7542]); 

  const t = {
    placeholder: Language === "AMH" ? "ከተማ / ወረዳ" : "City / Woreda",
    unknown: Language === "AMH" ? "ያልታወቀ ቦታ" : "Unknown Location",
    mapInstruction: Language === "AMH" 
      ? "ትክክለኛውን ወረዳ/ከተማ ለመምረጥ ካርታው ላይ ጠቅ ያድርጉ" 
      : "Click on the map to select your specific Woreda/City"
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      const addr = data.address;

      // Extract specific fields for database
      const subCity = addr.suburb || addr.county || addr.city_district || "";
      const woreda = addr.neighbourhood || addr.quarter || "";
      const city = addr.city || addr.town || addr.village || "";

      // Update the readable address for the user
      const readableAddress = `${woreda}${woreda && subCity ? ', ' : ''}${subCity}${subCity && city ? ', ' : ''}${city}`;
      
      setAddress(readableAddress || t.unknown);
      
      // Update the details for database submission
      setLocationDetails({
        sub_city: subCity,
        woreda: woreda
      });

    } catch (error) {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  function MapEvents() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        getAddressFromCoords(lat, lng);
        setShowMap(false); 
      },
    });
    return null;
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {/* DATA FOR DATABASE: These will be picked up by FormData */}
        <input type="hidden" name="sub_city" value={locationDetails.sub_city} />
        <input type="hidden" name="woreda" value={locationDetails.woreda} />
        <input type="hidden" name="latitude" value={position[0]} />
        <input type="hidden" name="longitude" value={position[1]} />
        
        {/* DISPLAY FOR USER: This shows the full readable name */}
        <input type="hidden" name={name} value={address} />
        
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t.placeholder}
          className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
        />
        
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition"
        >
          <img 
            src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768865108/location-162102_dbneo6.svg" 
            className='w-8 h-8' 
            alt="Location Icon" 
          />
        </button>
      </div>

      {showMap && (
        <div className="mt-2 h-64 w-full rounded-lg overflow-hidden border-2 border-green-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} />
            <MapEvents />
          </MapContainer>
          <div className="bg-green-600 text-[11px] font-bold text-center py-1.5 text-white">
            {t.mapInstruction}
          </div>
        </div>
      )}
    </div>
  );
}