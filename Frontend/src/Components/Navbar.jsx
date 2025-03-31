import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { useAuth } from '../Context/AuthContext'
const Navbar = () => {
  const {isLoggedIn,logOut}=useAuth();
  const [user,setUser]=useState(null);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  },[]);
  return (
    <div className='sticky top-0 w-full h-[12vh] p-5 flex items-center justify-between bg-[#ED5353] rounded-br-4xl rounded-bl-4xl md:px-10 px-5'>
      <h1 className='font-semibold text-white text-lg md:text-2xl'>Jobfinder</h1>
      
      {isLoggedIn ? (
        <div className='flex gap-4 items-center'>
          <button onClick={logOut} className='text-sm md:text-lg cursor-pointer text-white border-2 border-white py-1 px-3 rounded-md'>Logout</button>
          <p className='text-lg text-white font-semibold hidden sm:block'>Hello, {user?.name}</p>
          <img src="https://cdn-icons-png.flaticon.com/512/4319/4319293.png" alt="User Avatar" width={35} className='rounded-full border-2 border-gray-200' />
        </div>
      ) : (
        <div className="flex items-center gap-4 bg-[#FF6B6B] rounded-b-full h-[12vh] px-5 sm:px-10 md:px-20">
          <Link to="/login">
            <button className='border-2 border-white text-white bg-transparent rounded-md font-semibold cursor-pointer px-1 text-sm md:text-base md:px-3 py-1'>Login</button>
          </Link>
          <Link to="/register">
            <button className='border-2 border-white text-[#ED5353] bg-white rounded-md font-semibold cursor-pointer px-1 text-sm md:text-base md:px-3 py-1'>Register</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar