import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useAuth} from "../Context/AuthContext";
const JobDetails = () => {
  const {isLoggedIn}=useAuth();
  const { id } = useParams(); 
  const location = useLocation();
  const job = location.state?.jobDetails;

  if (!job) {
    return <p className="text-center mt-10">Loading job details...</p>;
  }
 
  const convertFormat = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${day} ${month} ${year}`;
  };
  return (
    <div className="bg-[#ffefef] p-6">
    <div className=" w-3/4  mx-auto">
        <div className="bg-white text-center py-6 font-semibold rounded-md text-xl">
            {job.position} work from {job.jobMode} job/internship at {job.companyName}
        </div>
        
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
          <div className='flex justify-between'>
          <div>
            <p className="text-gray-500 text-sm"><span>Posted:</span>{convertFormat(job.postedOn)} · {job.jobType}</p>
            <h1 className="text-2xl font-bold mt-2">{job.position}</h1>
            <p className="text-red-500 font-semibold">{job.location} | India</p>
           </div>
           <div>
            {isLoggedIn?<button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer'>Edit Job</button>:""}
           </div>
                        
          </div>
            <div className="flex justify-between mt-4 text-gray-600 font-semibold">
                {job.jobType==="Internship"?<p>💰 Stipend:<span className="text-black">Rs.{job.CTC}</span></p>:<p>💰 CTC: <span className="text-black">Rs {job.CTC} LPA</span></p>}
                {job.jobType==="Internship"&&<p>⏳ Duration: <span className="text-black">6 Months</span></p>}
            </div>
            
          
            <h2 className="text-lg font-bold mt-6">About company</h2>
            <p className="text-gray-600 mt-2">{job.aboutCompany}</p>
            
          
            <h2 className="text-lg font-bold mt-6">About the job/internship</h2>
            <p className="text-gray-600 mt-2">{job.jobDesc}</p>         
        
            <h3 className="text-lg font-bold mt-6">Skill(s) required</h3>
            <div className="flex gap-2 mt-2">
              {job.skills.map((skill)=>{
                   return                 <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">{skill}</span>
              })}
            </div>
            
          
            <h3 className="text-lg font-bold mt-6">Additional Information</h3>
            <p className="text-gray-600 mt-2">{job.information}</p>
        </div>
    </div>
</div>
  );
};

export default JobDetails;
