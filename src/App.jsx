import { useState } from 'react'
import reactLogo from './assets/react.svg'


import AboutServices from './Pages/CitizenPages/AboutServices'
import Home from './Pages/CitizenPages/Home'
import { HiLogin } from 'react-icons/hi'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import SubmitComplaint from './Pages/CitizenPages/SubmitComplaint'
import ComplaintSubmittedPage from './Pages/CitizenPages/ComplaintSubmittedPage'
import TrackComplaintPage from './Pages/CitizenPages/TrackComplaintPage'
import FeedbackPage from './Pages/CitizenPages/FeedbackPage'
import ContactPage from './Pages/CitizenPages/ContactPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home}> </Route>
      <Route path='/about' Component={AboutServices}></Route>
      <Route path='/submit-complaint' Component={SubmitComplaint}></Route>
      <Route path='/ComplaintSubmittedPage' Component={ComplaintSubmittedPage}></Route>
         <Route path='/TrackComplaintPage' Component={TrackComplaintPage}></Route>
         <Route path='/FeedbackPage' Component={FeedbackPage}></Route>
          <Route path='/ContactPage' Component={ContactPage}></Route>
        
         
</Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
