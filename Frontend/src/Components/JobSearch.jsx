import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext"
const JobSearch = ({handleSearchChange,handleSearch,query1,query2,query3}) => {
  const Skills = [
    "Skills","JavaScript", "React.js", "Node.js", "Express.js", "Next.js",
    "TypeScript", "MongoDB", "MySQL", "PostgreSQL", "Firebase",
    "Python", "Django", "Flask", "Java", "Spring Boot",
    "C++", "C#", ".NET Framework", "Android Development", "Swift (iOS)",
    "Tailwind CSS", "Bootstrap", "REST APIs", "GraphQL", "Docker",
    "Kubernetes", "AWS", "Google Cloud Platform", "Cybersecurity", "DevOps"
  ];

  const navigate=useNavigate();
  const {isLoggedIn}=useAuth();
  
  const [error, setError] = useState("");
  const [selectedSkill,setSelectedSkill]=useState([]);
   
  //Adding selected skills into selectedSkill array
  const handleSkillSelect=(skill)=>{
     if(!selectedSkill.includes(skill)){
      setSelectedSkill([...selectedSkill,skill]);
     }
  }
  
  //Remove perticular skill from selected skills
  const handleRemoveSkills=(skillToRemove)=>{
    setSelectedSkill(selectedSkill.filter((skill) => skill !== skillToRemove));
  }
  
  //Clear all selected skills
  const clearAllSelectedSkills=()=>{
    setSelectedSkill([]);
  }
  
  const validateAndSearch = () => {
    if (!query1.trim() || !query2.trim() || !query3.trim()) {
      setError("All fields are required!");
      return;
    }
    setError(""); 
    handleSearch();
  };
  return (
    <div className='mt-10 flex flex-col justify-center mx-auto p-5  w-3/4 shadow-[0px_4px_10px_#FF202040] '>
      <div className="flex gap-5">
        <select className='border-2 border-gray-200 rounded-md px-1 py-2 w-[10vw]'  value={query1} onChange={(e)=>handleSearchChange(e,"jobType")} required>
               <option value="" disabled  className='text-[#9C9C9C] '>Select Job Type</option>
               <option value="Full Time" className='text-slate-800'>Full Time</option>
               <option value="Part Time" className='text-slate-800'>Part Time</option>
               <option value="Internship" className='text-slate-800'>Internship</option>
          </select>  
        <input type="text" className='border-2 border-gray-200 rounded-md text-slate-900 px-4 py-2 w-[30vw]' placeholder='Enter Designation / Companies' value={query2} onChange={(e)=>handleSearchChange(e,"position")} required/>
        <input type="text" className='border-2 border-gray-200 rounded-md text-slate-900 px-4 py-2 w-[15vw]' placeholder='Enter Location ' value={query3} onChange={(e)=>handleSearchChange(e,"location")} required/>
        <button className='px-2 py-1 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer' onClick={validateAndSearch}>🔍Search Job</button>
      </div>
      <div className="h-[20px] mt-2">
         {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="my-3 flex justify-between items-center">
        <div className="flex gap-3">
        <select name="skills" className='border-2 border-gray-200 text-center py-2 rounded-md text-[#9C9C9C] w-28 outline-none' onChange={(e)=>handleSkillSelect(e.target.value)}>
          
          {Skills.map((skill)=>{
             return <option className='text-slate-800' key={skill} value={skill}>{skill}</option>
          })}
         </select>
         <div className="flex space-x-3">
          {selectedSkill?.map((skill)=>{
             return  <div key={skill} className="flex items-center bg-red-100 rounded-lg overflow-hidden">
             <span className="px-4 py-2 text-black">{skill}</span>
             <button className="bg-[#ED5353] px-3 py-2 text-white" onClick={()=>handleRemoveSkills(skill)}>
             ✕
            </button>
            </div>
          })}
           
       </div>
        </div>
        
        <div className="flex gap-5">
          {isLoggedIn?<button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer' onClick={()=>navigate("/addJob")}>+ Add Job</button>
          :<button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer'>Apply filters</button>
            }
          <button className='text-[#ED5353] font-semibold cursor-pointer' onClick={clearAllSelectedSkills}>Clear</button>
        </div>
      </div>
     
    </div>
  )
}

export default JobSearch