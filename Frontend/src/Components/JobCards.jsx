import React,{useEffect, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faIndianRupeeSign,  faLocationDot,  faUserGroup} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
const JobCards = ({job}) => {
  const [user,setUser]=useState(null);
  const navigate=useNavigate();
  const [jobDetails,setJobDetails]=useState(null);

  const {isLoggedIn}=useAuth();

  const viewJobDetails=async(id)=>{
    
    if(!id){
      alert("Something went wrong");
    }
    try {
      const res=await axios.get(`https://job-finder-app-backend-8snr.onrender.com/api/jobs/jobDetails/${id}`,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
        }
      });
      if(res.status===200){
        setJobDetails(res.data.jobDetails);
        navigate(`/jobDetails/${id}`,{ state: { jobDetails: res.data.jobDetails } });
      }
    } catch (error) {
      toast.error(error);
    }
  
  }
  
  useEffect(()=>{
    const storedUser=localStorage.getItem("user");
    if(storedUser){
       setUser(JSON.parse(storedUser));
    }
  })
  const convertFormat = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}y ago`;
   };
 
  return (
    <div className='w-[90vw]  md:w-3/4 px-2 md:px-5 pt-5 pb-2 rounded-md mt-10 shadow-[0px_4px_10px_#FF202040] mx-auto bg-white'>
    <Toaster position='top-center' reverseOrder={false} />
    <div className='flex flex-col md:flex-row justify-between gap-4'>
      {/* Left Side - Job Info */}
      <div className='flex flex-col md:flex-row gap-3'>
        <div className='logo flex justify-center md:block'>
         {job.logoUrl?<img src={job?.logoUrl || ''} alt='' className='rounded-md w-[100px] md:w-[50px]' />:<p className='w-12 h-[7vh] flex items-center justify-center font-bold text-2xl rounded-[100%] text-white bg-[#ED5353] p-1'>{job?.companyName.split("")[0]}</p>} 
        </div>
        <div className='flex flex-col gap-2 text-center md:text-left'>
          <h1 className='font-bold text-lg'>{job?.position}</h1>
          <div className='flex flex-wrap justify-center md:justify-start gap-3 text-[#717b9e]'>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faBriefcase} />
              <span>{job?.experience} years</span>
            </div>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faUserGroup} />
              <span>{job?.companySize}</span>
            </div>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faIndianRupeeSign} />
              {job?.jobType === 'Internship' ? (
                <span>{job?.CTC} Per Month</span>
              ) : (
                <span>{job?.CTC} Lacs P.A.</span>
              )}
            </div>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{job?.location}</span>
            </div>
          </div>
          <div className='flex gap-3 justify-center md:justify-start text-[#ED5353] font-semibold text-sm'>
            <p>{job?.jobType}</p>
            <p>{job?.jobMode}</p>
          </div>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className='flex flex-col items-center md:items-end gap-3'>
        <div className='flex flex-wrap gap-2 justify-center md:justify-end'>
          {job?.skills.map((skill) => (
            <p className='bg-[#FFEEEE] px-3 py-1 text-sm font-semibold rounded-md' key={skill}>{skill}</p>
          ))}
        </div>
        <div className='flex gap-3 mt-2'>
          {isLoggedIn && job.createdBy===user._id && (
            <button
              className='cursor-pointer text-sm md:text-base text-[#ED5353] bg-white rounded-md px-3 py-1 border-2 border-[#ED5353] hover:bg-[#ED5353] hover:text-white transition-all'
              onClick={() => navigate(`/editJob/${job._id}`)}
            >
              Edit Job
            </button>
          )}
          <button
            className='text-sm md:text-base bg-[#ED5353] text-white rounded-md px-3 cursor-pointer py-1 hover:opacity-80 transition-all'
            onClick={() => viewJobDetails(job._id)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
    <p className='text-[#717b9e] text-sm mt-3'>{convertFormat(job.postedOn)}</p>
  </div>

  )
}

export default JobCards