import React from 'react'

const JobSearch = () => {
  const skills = [
    "Skills","JavaScript", "React.js", "Node.js", "Express.js", "Next.js",
    "TypeScript", "MongoDB", "MySQL", "PostgreSQL", "Firebase",
    "Python", "Django", "Flask", "Java", "Spring Boot",
    "C++", "C#", ".NET Framework", "Android Development", "Swift (iOS)",
    "Tailwind CSS", "Bootstrap", "REST APIs", "GraphQL", "Docker",
    "Kubernetes", "AWS", "Google Cloud Platform", "Cybersecurity", "DevOps"
  ];
  
  return (
    <div className='mt-10 flex flex-col justify-center mx-auto p-5  w-3/4 shadow-[0px_4px_10px_#FF202040] '>
      <div className="flex gap-5">
        <input type="text" name="" id="" className='border-2 border-gray-200 rounded-md text-slate-900 px-4 py-2 w-[50vw]' placeholder='🔍  Type any job title ' />
        <button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer'>Search</button>
      </div>
      <div className="my-3 flex justify-between items-center ">
        <div className="flex gap-3">
        <select name="skills" className='border-2 border-gray-200 text-center py-2 rounded-md text-[#9C9C9C] w-28 outline-none'>
          {skills.map((skill)=>{
             return <>
             <option value={skill}>{skill}</option>
             </>
          })}
         </select>
         <div class="flex space-x-3">
            <div class="flex items-center bg-red-100 rounded-lg overflow-hidden">
              <span class="px-4 py-2 text-black">Frontend</span>
              <button class="bg-[#ED5353] px-3 py-2 text-white">
              ✕
             </button>
             </div>
            <div class="flex items-center bg-red-100 rounded-lg overflow-hidden">
              <span class="px-4 py-2 text-black">HTML</span>
              <button class="bg-[#ED5353] px-3 py-2 text-white">
              ✕
             </button>
             </div>
            <div class="flex items-center bg-red-100 rounded-lg overflow-hidden">
              <span class="px-4 py-2 text-black">CSS</span>
              <button class="bg-[#ED5353] px-3 py-2 text-white">
              ✕
             </button>
             </div>
       </div>
        </div>
        
        <div className="flex gap-5">
          <button className='px-2 py-2 bg-[#ED5353] text-white rounded-md font-semibold cursor-pointer'>Apply filters</button>
          <button className='text-[#ED5353] font-semibold cursor-pointer'>Clear</button>
        </div>
      </div>
     
    </div>
  )
}

export default JobSearch