import React,{useState} from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIndianRupeeSign,  faUserGroup} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
const JobCards = ({job}) => {
  const navigate=useNavigate();
  const [jobDetails,setJobDetails]=useState(null);

  const {isLoggedIn}=useAuth();

  const viewJobDetails=async(id)=>{
    
    if(!id){
      alert("Something went wrong");
    }
    try {
      const res=await axios.get(`http://localhost:3000/api/jobs/jobDetails/${id}`,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
        }
      });
      if(res.status===200){
        setJobDetails(res.data.jobDetails);
        console.log(res.data);
        navigate(`/jobDetails/${id}`,{ state: { jobDetails: res.data.jobDetails } });
      }
    } catch (error) {
      alert(error);
    }
  
  }
 
  return (
   <div className='mainCard p-5 rounded-md mt-10 shadow-[0px_4px_10px_#FF202040]   mx-auto flex justify-between w-3/4'>
    <div className='flex gap-3'>
      <div className="logo">
        <img src={job?.logoUrl || "https://dummyimage.com/50/000/fff"} alt="" width={50}/>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>{job?.position}</h1>
        <div className='flex items-center gap-5'>
          <div className='text-[#9C9C9C]'>
          <FontAwesomeIcon icon={faUserGroup}/>
          <span className='ml-2'>{job?.companySize}</span>
          </div>
          <div className='text-[#9C9C9C]'>
          <FontAwesomeIcon icon={faIndianRupeeSign}/>
          {job.jobType=="Internship"?<span className='ml-2'>{job?.CTC} Per Month</span>:<span className='ml-2'>{job?.CTC} Lacs P.A.</span>}
          </div>
          <p className='text-[#9C9C9C]'>{job?.location}</p>
        </div>
        <div className='flex gap-5 text-[#ED5353] font-semibold text-sm'>
          <p>{job?.jobType}</p>
          <p>{job?.jobMode}</p>
        </div>
      </div>
    </div>
    <div className='flex flex-col items-end'>
       <div className='flex gap-5'>
        {job?.skills.map((skill)=>{
          return  <p className='bg-[#FFEEEE] p-2 font-semibold' key={skill}>{skill}</p>
        })}
       </div>
       <div className='mt-5 flex gap-5'>
         {isLoggedIn&& <button className='text-[#ED5353] bg-white rounded-md px-2 py-1 cursor-pointer border-2 border-[#ED5353]'>Edit Job</button>}
          <button className='bg-[#ED5353] text-white rounded-md px-2 py-1 cursor-pointer' onClick={()=>viewJobDetails(job._id)}>View Details</button>
       </div>
    </div>
   </div>    

  )
}

export default JobCards