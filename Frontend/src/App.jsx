import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AddJob from './Pages/AddJob';
import JobDetails from './Pages/JobDetails';
function App() {
  
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addJob" element={<AddJob/>}/>
        <Route path="/jobDetails/:id" element={<JobDetails/>}/>

      </Routes>
      
    </Router>  
  </div>
  )
}

export default App
