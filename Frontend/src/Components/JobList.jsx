import React from 'react'
import JobCard from "../Components/JobCards"
const JobList = ({filteredJobs}) => {
  return (
    <div className='my-5'>
    {filteredJobs.length>0?filteredJobs.map((job)=>{
    return <JobCard job={job} key={job._id}/>  
    }):<p className='mt-10 font-bold text-2xl text-center'>No jobs available</p>
   }
 </div>
  )
}

export default JobList