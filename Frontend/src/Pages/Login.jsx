import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import img from "../Assets/AuthBanner.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import API from '../api';
const Login = () => {
  const {login}=useAuth();
  const navigate=useNavigate();
   const [loginFormData,setLoginFormData]=useState({
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setLoginFormData({...loginFormData,[name]:value});
  }

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
  
    const res=await API.post("/api/auth/login",loginFormData,{
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(res.status===200){
      toast.success(res.data.message);
      login(res.data.token,res.data.user);
      navigate("/");
    } 
        
  }catch(error){
    toast.error(error.response.data.message);
  }
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Already have an account?</h1>
          <p className="text-gray-700 mt-2">Your personal job finder is here</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md">
          <input type="email" name="email" placeholder='Email' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full font-semibold' value={loginFormData.email} onChange={handleChange}/>
          <input type="password" name="password" placeholder='Password' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full font-semibold' value={loginFormData.password} onChange={handleChange}/>
          
          <button type="submit" className='cursor-pointer py-2 px-4 text-lg font-semibold text-white bg-[#ed5353] rounded-md w-full'>Sign In</button>
          <p className='text-center mt-2'>
            <span className='text-gray-900'>Don't have an account? </span>
            <Link to="/register" className="text-black font-semibold underline">Sign Up</Link>
          </p>
        </form>
      </div>
      
      {/* Image Section */}
      <div className="hidden md:block w-1/2 relative">
        <img src={img} alt="" className='w-full h-full object-cover' />
        <p className='absolute top-10 left-10 text-white text-2xl font-medium'>Your Personal Job Finder</p>
      </div>
    </div>
  )
}

export default Login