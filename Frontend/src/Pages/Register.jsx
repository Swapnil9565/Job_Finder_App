import React from 'react'
import { Link } from 'react-router-dom'
import img from "../Assets/AuthBanner.png"
const Register = () => {
  return (
    <div>
         <div className="absolute top-1/2 left-1/2 transform  -translate-y-1/2">
          <div className='my-5 '>
            <h1 className='text-3xl font-bold '>Create an account</h1>
            <p className='my-2 text-gray-700'>Your personal job finder is here</p>
          </div>
            <form action="" className='flex flex-col gap-5'>
              <div>
                <input type="text" placeholder='Name' className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' />
              </div>
              <div>
                <input type="email" placeholder='Email' className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' />
              </div>
              <div>
                <input type="text" placeholder='Mobile' className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' />
              </div>
              <div>
                <input type="password" placeholder='Password' className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' />
              </div>
              <div className=' flex items-center gap-5'>
                <input type="checkbox" />
                <p>By creating an account, I agree to our terms of use and privacy policy</p>
              </div>
              <div>
                <button type="submit" className='cursor-pointer py-2 px-1 w-40 font-semibold text-lg text-white bg-[#ed5353] rounded-md'>Create Account</button>
              <p className='mt-2'><span className='text-gray-900'>Already have an account? </span><Link to="/login" className="text-black font-semibold underline">Sign In</Link></p>
              </div>
            </form>
         </div>
         <div className="">
            <img src={img} alt="" className='w-[40vw] h-screen' />
            <p className='absolute top-[5%] left-[10%] text-white text-2xl font-medium'>Your Personal Job Finder</p>
         </div>
    </div>
  )
}

export default Register