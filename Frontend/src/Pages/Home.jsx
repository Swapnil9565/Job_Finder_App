import React,{useEffect,useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import axios from 'axios'
import JobSearchArea from "../Components/JobSearch"
import JobList from '../Components/JobList'
import { faSort } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [jobs,setJobs]=useState([]); 
  const [filteredJobs,setFilteredJobs]=useState([]);
  const [query1,setQuery1]=useState("");
  const [query2,setQuery2]=useState("");
  const [query3,setQuery3]=useState("");
  
  useEffect(()=>{
    const fetchAllJobs=async()=>{
         const res=await axios.get("https://job-finder-app-backend-8snr.onrender.com/api/jobs/allJobs");
         if(res.status===200){ 
            setJobs(res.data.allJobs);
            setFilteredJobs(res.data.allJobs);
         }
    }
    fetchAllJobs(); 
  },[])
  
  const handleSearchChange=(e,field)=>{
    if (field === "jobType") setQuery1(e.target.value);
    if (field === "position") setQuery2(e.target.value);
    if (field === "location") setQuery3(e.target.value);
  }
  
  const handleSearch=()=>{
 
    if (query2.trim() === "") {
      setFilteredJobs(jobs); 
    } else {
      const filteredData = jobs.filter((job) =>
        (job.jobType).toLowerCase().includes(query1.toLowerCase()) && (job.position).toLowerCase().includes(query2.toLowerCase())
        && (job.location).toLowerCase().includes(query3.toLowerCase())
      );
      setFilteredJobs(filteredData);
    }
   
  }
  return (
    <div>
        <JobSearchArea  handleSearchChange={handleSearchChange} handleSearch={handleSearch} query1={query1}  query2={query2} query3={query3}/>
      <div className="my-4 w-[90vw] md:w-3/4 mx-auto relative">
      <div className="relative inline-block text-gray-700">
        <FontAwesomeIcon 
          icon={faSort} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
        />
        <select
          className="pl-3 pr-4 text-sm md:text-base md:pl-5 md:pr-7 py-2 border-2 border-gray-300 rounded-md appearance-none"
         
        >
          <option value="">Sort</option>
          <option value="latest">Latest Jobs</option>
          <option value="oldest">Oldest Jobs</option>
        </select>
      </div>
      </div>
        <JobList filteredJobs={filteredJobs}/>
    </div>
  )
}

export default Home