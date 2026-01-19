import { useState } from 'react'
import reactLogo from './assets/react.svg'


import AboutServices from './Pages/CitizenPages/AboutServices'
import Home from './Pages/CitizenPages/Home'
import { HiLogin } from 'react-icons/hi'
import { BrowserRouter , Routes, Route } from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home}> </Route>
      <Route path='/about' Component={AboutServices}></Route>
</Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
