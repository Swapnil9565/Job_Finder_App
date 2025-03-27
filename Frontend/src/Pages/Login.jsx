import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../Assets/AuthBanner.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
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
  
    const res=await axios.post("http://localhost:3000/api/auth/login",loginFormData,{
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(res.status===200){
      alert(res.data.message);
      localStorage.setItem("token",res.data.token);
      navigate("/");
    }      
  }catch(error){
    alert(error.message);
  }
  }
  return (
    <div>
    <div className="absolute top-1/2 left-1/2 transform  -translate-y-1/2">
     <div className='my-5 '>
       <h1 className='text-3xl font-bold '>Already have an account?</h1>
       <p className='my-2 text-gray-700'>Your personal job finder is here</p>
     </div>
       <form onSubmit={handleLogin} className='flex flex-col gap-5'>
         <div>
           <input type="email" placeholder='Email' name='email' value={loginFormData.email} className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' onChange={handleChange}/>
         </div>
         <div>
           <input type="password" placeholder='Password' name='password' value={loginFormData.password} className='py-3 px-2 outline-none border-2 border-gray-300 rounded-md text-slate-700 font-semibold w-96' onChange={handleChange}/>
         </div>
         <div>
           <button type="submit" className='cursor-pointer py-2 px-1 w-40 font-semibold text-lg text-white bg-[#ed5353] rounded-md'>Sign In</button>
         <p className='mt-2'><span className='text-gray-900'>Don't have an account? </span><Link to="/register" className="text-black font-semibold underline">Sign Up</Link></p>
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

export default Login