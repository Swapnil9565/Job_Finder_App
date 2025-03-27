import React, { useEffect, useState } from 'react'
import axios from "axios";
import JobCard from "./JobCards"
const JobLists = () => {
  
    const [jobs,setJobs]=useState([]);
  
    useEffect(()=>{
      const fetchAllJobs=async()=>{
           const res=await axios.get("http://localhost:3000/api/jobs/allJobs");
           if(res.status===200){ 
              setJobs(res.data.allJobs);
           }
      }
      fetchAllJobs(); 
    },[])
      

  return (
    <div className='my-5'>
    {jobs.length>0?jobs.map((job)=>{
      return <JobCard job={job} key={job._id}/>  
      }):<p className='mt-10 font-bold text-2xl text-center'>No jobs available</p>
      }
    </div>
  )
}

export default JobLists