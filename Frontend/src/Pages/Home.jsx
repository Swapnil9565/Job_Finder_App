import React,{useEffect,useState} from 'react'
import axios from 'axios'
import JobSearchArea from "../Components/JobSearch"
import JobList from '../Components/JobList'

const Home = () => {
  const [jobs,setJobs]=useState([]); 
  const [filteredJobs,setFilteredJobs]=useState([]);
  const [query1,setQuery1]=useState("");
  const [query2,setQuery2]=useState("");
  const [query3,setQuery3]=useState("");
  
  useEffect(()=>{
    const fetchAllJobs=async()=>{
         const res=await axios.get("http://localhost:3000/api/jobs/allJobs");
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
        (job.jobType).toLowerCase().includes(query1.toLowerCase()) && (job.position && job.companyName).toLowerCase().includes(query2.toLowerCase())
        && (job.location).toLowerCase().includes(query3.toLowerCase())
      );
      setFilteredJobs(filteredData);
    }
   
  }
  return (
    <div>
        <JobSearchArea  handleSearchChange={handleSearchChange} handleSearch={handleSearch} query1={query1}  query2={query2} query3={query3}/>
       <JobList filteredJobs={filteredJobs}/>
    </div>
  )
}

export default Home