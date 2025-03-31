import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {useAuth} from "../Context/AuthContext";
const JobDetails = () => {
  const navigate=useNavigate();
  const {isLoggedIn,user}=useAuth();
  const { id } = useParams(); 
  const location = useLocation();
  const job = location.state?.jobDetails;

  if (!job) {
    return <p className="text-center mt-10">Loading job details...</p>;
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
    <div className="bg-[#ffefef] p-4 sm:p-6">
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white text-center py-4 sm:py-6 font-semibold rounded-md text-base sm:text-xl">
        {job.position} {job.jobMode === "Remote" ? "work from home" : "work from office"} job/internship at {job.companyName}
      </div>
      
      <div className="bg-white mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">{convertFormat(job.postedOn)} · {job.jobType}</p>
            <h1 className="text-lg md:text-2xl font-bold mt-2">{job.position}</h1>
            <p className="text-sm md:text-base text-[#ED5353] font-semibold">{job.location} | India</p>
          </div>
          {isLoggedIn && job.createdBy===user?._id && (
            <button 
              className='mt-2 text-sm md:text-base sm:mt-0 px-3 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer' 
              onClick={() => navigate(`/editJob/${job._id}`)}
            >
              Edit Job
            </button>
          )}
        </div>

        <div className="text-sm md:text-base flex flex-col sm:flex-row justify-between mt-4 text-gray-600 font-semibold">
          {job.jobType === "Internship" ? (
            <p>💰 Stipend: <span className="text-black">Rs.{job.CTC}</span></p>
          ) : (
            <p>💰 CTC: <span className="text-black">{job.CTC==="Not disclosed"?job.CTC:`Rs ${job.CTC} LPA`}</span></p>
          )}
          {job.jobType === "Internship" && <p>⏳ Duration: <span className="text-black">6 Months</span></p>}
        </div>

        <h2 className="text-lg font-bold mt-6">About company</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2">{job.aboutCompany}</p>
        
        <h2 className="text-lg font-bold mt-6">About the job/internship</h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 whitespace-pre-line">{job.jobDesc}</p>
        
        <h3 className="text-lg font-bold mt-6">Skill(s) required</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-[#FFEEEE] px-3 py-1 rounded-lg text-sm">{skill}</span>
          ))}
        </div>
        
        <h3 className="text-lg font-bold mt-6">Additional Information</h3>
        <p className="text-sm md:text-base text-gray-600 mt-2">{job.information}</p>
      </div>
    </div>
  </div>
  );
};

export default JobDetails;
