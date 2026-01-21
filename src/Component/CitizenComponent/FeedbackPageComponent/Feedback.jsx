import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Star, Loader2 } from 'lucide-react'; 
import { useSendFeedbackMutation } from '../../../Redux/citizenApi';

const Feedback = () => {
  const { Language } = useSelector((state) => state.webState);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  // RTK Query Mutation
  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();

  const t = {
    title: Language === "AMH" ? "አስተያየትዎን ያጋሩ" : "Share Your Feedback",
    subtitle: Language === "AMH" ? "የአካባቢ ጥበቃ አገልግሎታችንን ለማሻሻል ይረዱን" : "Help us improve our environmental services",
    ratingLabel: Language === "AMH" ? "አገልግሎታችንን እንዴት ይገመግሙታል?" : "How would you rate our service?",
    veryPoor: Language === "AMH" ? "በጣም ዝቅተኛ" : "Very Poor",
    excellent: Language === "AMH" ? "በጣም ምርጥ" : "Excellent",
    optionalComments: Language === "AMH" ? "ተጨማሪ አስተያየት (ካለዎት)" : "Optional Comments",
    placeholder: Language === "AMH" ? "ያጋጠመዎትን ነገር እዚህ ይግለጹ..." : "Tell us about your experience...",
    submitBtn: Language === "AMH" ? "አስተያየትን ላክ" : "Submit Feedback",
    footerNote: Language === "AMH" 
      ? "አስተያየትዎ ለምክር ቤቱ የዜጎች እርካታ ትንታኔ ለማዘጋጀት ጥቅም ላይ ይውላል።" 
      : "Your feedback is used to generate citizen satisfaction analytics for the Advisory Council.",
    successMsg: Language === "AMH" ? "ስለ አስተያየትዎ እናመሰግናለን!" : "Thank you for your feedback!"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Execute RTK Query Mutation
      await sendFeedback({ rating, comment }).unwrap();
      
      alert(t.successMsg);
      // Reset form after successful submission
      setRating(0);
      setComment("");
    } catch (err) {
      alert(err?.data?.message || "Failed to send feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-30 bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Institutional Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-8 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <span className="font-bold text-lg">EPA</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <p className="text-green-50 text-sm mt-2 opacity-90">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Rating Scale */}
          <div className="text-center">
            <label className="block text-slate-700 font-bold mb-5 text-lg">
              {t.ratingLabel}
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isLoading}
                  className="transition-transform active:scale-90 hover:scale-110 disabled:opacity-50"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={42}
                    className={`transition-all duration-200 ${
                      star <= (hover || rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-3 px-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <span>{t.veryPoor}</span>
              <span>{t.excellent}</span>
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-slate-700 font-bold mb-2 ml-1" htmlFor="comment">
              {t.optionalComments}
            </label>
            <textarea
              id="comment"
              rows="4"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all resize-none text-slate-600 placeholder:text-slate-300 disabled:bg-slate-50"
              placeholder={t.placeholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!rating || isLoading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              rating 
                ? "bg-green-600 hover:bg-green-700 shadow-green-100" 
                : "bg-slate-300 cursor-not-allowed shadow-none"
            } ${isLoading ? "opacity-80" : ""}`}
          >
            {isLoading && <Loader2 className="animate-spin" size={20} />}
            {t.submitBtn}
          </button>
        </form>

        <div className="bg-slate-50 p-6">
          <p className="text-center text-[11px] text-slate-400 leading-relaxed font-medium">
            {t.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;