import React from 'react'
import {Link} from "react-router-dom"
import { useAuth } from '../Context/AuthContext'
const Navbar = () => {
  const {isLoggedIn,login,logOut}=useAuth();
  return (
    <div className='w-full h-[12vh] p-5 flex items-center justify-between bg-[#ED5353] rounded-br-4xl rounded-bl-4xl'>
       <h1 className='font-semibold text-white text-2xl'>Jobfinder</h1>
       {isLoggedIn?<div className='flex gap-5 items-center'>
        <button onClick={logOut} className='text-lg cursor-pointer text-white border-2 border-white py-1 px-2 rounded-md'>Logout</button>
         <p className='text-lg text-white font-semibold'>Hello, Recruiter</p>
         <img src="https://cdn-icons-png.flaticon.com/512/4319/4319293.png" alt="" width={35} className='rounded-[100%] border-2 border-gray-200' />
        </div>: <div className="flex items-center justify-center gap-5 bg-[#FF6B6B] rounded-b-full h-[12vh] px-20">
       <Link to="/login"><button className='border-2 border-white text-white bg-transparent rounded-md font-semibold  cursor-pointer px-3 py-1' onClick={login}>Login</button></Link>
       <Link to="/register"><button className='border-2 border-white text-[#ED5353] bg-white rounded-md font-semibold  cursor-pointer px-3 py-1'>Register</button></Link>
       </div>
       }
    </div>
  )
}

export default Navbar