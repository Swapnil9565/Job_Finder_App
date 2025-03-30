import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom'
import img from "../Assets/AuthBanner.png"
import  axios from "axios";

const Register = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    agreeTerms: false,
  })

  const handleChange=(e)=>{
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  }
  
    // Form Validation
    const [errors,setErrors]=useState({});
    const validateForm = () => {
      let newErrors = {};
  
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 3) {
        newErrors.name = 'Name must be at least 3 characters';
      }
  
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
  
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Mobile number must be 10 digits';
      }
  
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
  
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  const handleRegister=async(e)=>{
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

try {
  const res=await axios.post("https://job-finder-app-backend-8snr.onrender.com/api/auth/signUp",formData,{
    headers:{
      "Content-Type":"application/json",
    }
  })
  if(res.status===200){
     toast.success(res.data.message);
   navigate("/login");
   return ;
  }
 
} catch (error) {
  toast.error(error.response.data.message);
} 
  }
  

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
    <Toaster position="top-center" reverseOrder={false} />
    
    {/* Form Section */}
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-700 mt-2">Your personal job finder is here</p>
      </div>
      
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-full max-w-md">
        <div>
        <input type="text" name="name" placeholder='Name' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full' value={formData.name} onChange={handleChange}/>
        <div className='h-[3vh]'>
        {errors.name && <p className="text-red-500 text-sm mt-">{errors.name}</p>}
        </div>
       </div>

       <div>
        <input type="email" name="email" placeholder='Email' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full' value={formData.email} onChange={handleChange}/>
        <div className='h-[3vh]'>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        </div>
       </div>

       <div>
        <input type="text" name="mobile" placeholder='Mobile' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full' value={formData.mobile} onChange={handleChange} />
        <div className='h-[3vh]'>
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

        </div>
       </div>

       <div>
        <input type="password" name="password" placeholder='Password' className='py-3 px-4 outline-none border-2 border-gray-300 rounded-md text-slate-700 w-full' value={formData.password} onChange={handleChange} />
        <div className='h-[3vh]'>

        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
       </div>

        <div className='flex items-center gap-1'>
          <input type="checkbox" className='w-4 h-4' name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />   
          <p className='text-sm'>By creating an account, I agree to our <span className='text-blue-600 underline'>terms of use</span> and <span className='text-blue-600 underline'>privacy policy</span>.</p>
        </div>
        <div className='h-[3vh]'>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
        </div>
        
        <button type="submit" className='cursor-pointer py-2 px-4 text-lg text-white bg-[#ed5353] rounded-md w-full'>Create Account</button>
        <p className='text-center mt-2'>
          <span className='text-gray-900'>Already have an account? </span>
          <Link to="/login" className="text-black font-semibold underline">Sign In</Link>
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

export default Register