import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext"
const JobSearch = () => {
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
  
  return (
    <div className='mt-10 flex flex-col justify-center mx-auto p-5  w-3/4 shadow-[0px_4px_10px_#FF202040] '>
      <div className="flex gap-5">
        <input type="text" name="" id="" className='border-2 border-gray-200 rounded-md text-slate-900 px-4 py-2 w-[50vw]' placeholder='🔍  Type any job title ' />
        <button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer'>Search</button>
      </div>
      <div className="my-3 flex justify-between items-center ">
        <div className="flex gap-3">
        <select name="skills" className='border-2 border-gray-200 text-center py-2 rounded-md text-[#9C9C9C] w-28 outline-none' onChange={(e)=>handleSkillSelect(e.target.value)}>
          {Skills.map((skill)=>{
             return <option key={skill} value={skill}>{skill}</option>
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