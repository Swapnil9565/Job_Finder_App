import './App.css'
import {  Route, Routes, useLocation } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AddJob from './Pages/AddJob';
import JobDetails from './Pages/JobDetails';
import Navbar from './Components/Navbar';
function App() {
  const location=useLocation();
  const showNavbar = location.pathname === "/" || location.pathname.startsWith("/jobDetails");
  
  return (
  <div>
  
      {showNavbar&&<Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addJob" element={<AddJob/>}/>
        <Route path="/jobDetails/:id" element={<JobDetails/>}/>

      </Routes>
   
  </div>
  )
}

export default App
