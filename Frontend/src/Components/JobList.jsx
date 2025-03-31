import React,{useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import JobCard from "../Components/JobCards"
import axios from 'axios'
const JobList = ({filteredJobs}) => {
  const [jobDetails,setJobDetails]=useState(null);
  const [loading,setLoading]=useState(false);

  const viewJobDetails=async(id)=>{
    
    if(!id){
      alert("Something went wrong");
    }
    setLoading(true);
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
    }finally{
      setLoading(false);
    }
  
  }
  return (
    <div className='my-2 md:my-5'>
      <Toaster position='top-center' reverseOrder={false} />
    {loading ? (
        <p className='mt-10 font-bold text-2xl text-center'>Loading jobs...</p>
      ) : filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard job={job} key={job._id} viewJobDetails={viewJobDetails} loading={loading} />
        ))
      ) : (
        <p className='mt-10 font-bold text-2xl text-center'>No jobs available</p>
      )}
 </div>
  )
}

export default JobList