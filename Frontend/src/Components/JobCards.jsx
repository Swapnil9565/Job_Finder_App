import React,{useState} from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faIndianRupeeSign,  faLocationDot,  faUserGroup} from "@fortawesome/free-solid-svg-icons"
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
  <div className='w-3/4 p-5 rounded-md mt-10 shadow-[0px_4px_10px_#FF202040]  mx-auto'>
   <div className=' flex justify-between'>
    <div className='flex gap-3'>
      <div className="logo">
        <img src={job?.logoUrl || "https://dummyimage.com/50/000/fff"} alt="" width={50}/>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>{job?.position}</h1>
        <div className='flex items-center gap-5 text-[#717b9e]'>
          <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faBriefcase}/>
          <span className=''>{job?.experience} years</span>
          </div>
          <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faUserGroup}/>
          <span className=''>{job?.companySize}</span>
          </div>
          <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faIndianRupeeSign}/>
          {job.jobType=="Internship"?<span className=''>{job?.CTC} Per Month</span>:<span className=''>{job?.CTC} Lacs P.A.</span>}
          </div>
          <div className='flex gap-2 items-center'>
          <FontAwesomeIcon icon={faLocationDot}/>
          <span>{job?.location}</span>
          </div>
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
         {isLoggedIn&& <button className='text-[#ED5353] bg-white rounded-md px-2 py-1 cursor-pointer border-2 border-[#ED5353]' onClick={()=>navigate(`/editJob/${job._id}`)}>Edit Job</button>}
          <button className='bg-[#ED5353] text-white rounded-md px-2 py-1 cursor-pointer' onClick={()=>viewJobDetails(job._id)}>View Details</button>
       </div>
    </div>
   </div>   
   
   <div>
   <p className='text-[#717b9e] text-sm'>{convertFormat(job.postedOn)}</p>
  </div>
</div>

  )
}

export default JobCards