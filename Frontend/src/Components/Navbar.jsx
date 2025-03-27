import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='w-full h-[12vh] p-5 flex items-center justify-between bg-[#ED5353] rounded-br-4xl rounded-bl-4xl'>
       <h1 className='font-semibold text-white text-2xl'>Jobfinder</h1>
       <div className="flex items-center justify-center gap-5 bg-[#FF6B6B] rounded-b-full h-[12vh] px-20">
       <Link to="/login"><button className='border-2 border-white text-white bg-transparent rounded-md font-semibold  cursor-pointer px-3 py-1'>Login</button></Link>
       <Link to="/register"><button className='border-2 border-white text-[#ED5353] bg-white rounded-md font-semibold  cursor-pointer px-3 py-1'>Register</button></Link>
       </div>
    </div>
  )
}

export default Navbar