import React, { useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import {useNavigate,useParams} from "react-router-dom";
import img from "../Assets/JobPosting.png";
import axios from "axios";
const AddJob = () => {
  const {id}=useParams();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    position: "",
    CTC: "",
    experience: "",
    jobType: "",
    jobMode: "",
    location: "",
    jobDesc: "",
    aboutCompany: "",
    skills: [],
    companySize: "",
    information: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const handleSkillAdd = (e) => {
    if (
      (e.key === "Enter" || e.nativeEvent.inputType === "insertLineBreak") &&
      skillInput.trim()
    ) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };
  

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   
  useEffect(()=>{
    const fetchJobData=async()=>{
      if(id){
      try {
        const res=await axios.get(`https://job-finder-app-backend-8snr.onrender.com/api/jobs/jobDetails/${id}`,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        if(res.status===200){
          setFormData(res.data.jobDetails);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
   
    }
    fetchJobData();
  },[id]);


  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(id){
        //updating existing job details
          res=await axios.put(`https://job-finder-app-backend-8snr.onrender.com/api/jobs/editJob/${id}`,formData,{
          headers:{
            "Content-Type":"application/json",
            Authorization:localStorage.getItem("token")
          }
        })
        if(res.status===200){
          toast.success(res.data.message);
          navigate("/");
        }
        
      }
      else{
      //Creating new jobs
       res = await axios.post(
        "https://job-finder-app-backend-8snr.onrender.com/api/jobs/addJob",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/");
        setFormData({
          companyName: "",
          logoUrl: "",
          position: "",
          CTC: "",
          experience: "",
          jobType: "",
          jobMode: "",
          location: "",
          jobDesc: "",
          aboutCompany: "",
          skills: [],
          companySize: "",
          information: "",
        });
      }
    }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='block md:flex md:justify-between'>
      <div className='w-full md:w-[50vw] p-3 md:p-10 bg-white'>
        <h1 className='text-xl md:text-3xl font-bold mb-6'>{id?"Edit":"Add"} job description</h1>
        <form onSubmit={handleJobSubmit} className='space-y-2 text-sm md:text-base'>
          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Company Name</label>
            <input
              type='text'
              placeholder='Enter your company name here'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Add logo URL</label>
            <input
              type='text'
              placeholder='Enter the link'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='logoUrl'
              value={formData.logoUrl}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Job Position</label>
            <input
              type='text'
              placeholder='Enter job position'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='position'
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>CTC/Stipend</label>
            <input
              type='text'
              placeholder='Enter Amount in rupees'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='CTC'
              value={formData.CTC}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Experience Required:</label>
            <select
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='experience'
              value={formData.experience}
              onChange={handleChange}>
              <option>Select</option>
              <option>0-1</option>
              <option>1-3</option>
              <option>3-5</option>
              <option>5-10</option>
              <option>10+</option>
            </select>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Job Type</label>
            <select
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='jobType'
              value={formData.jobType}
              onChange={handleChange}>
              <option>Select</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Remote/Office</label>
            <select
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='jobMode'
              value={formData.jobMode}
              onChange={handleChange}>
              <option>Select</option>
              <option>Remote</option>
              <option>Office</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Location</label>
            <input
              type='text'
              placeholder='Enter Location'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='location'
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Job Description</label>
            <textarea
              placeholder='Type the job description'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md h-[90px] md:h-[120px]'
              name='jobDesc'
              value={formData.jobDesc}
              onChange={handleChange}></textarea>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>About Company</label>
            <textarea
              placeholder='Type about your company'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md h-[90px] md:h-[120px]'
              name='aboutCompany'
              value={formData.aboutCompany}
              onChange={handleChange}></textarea>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Skills Required</label>
            <input
              type='text'
              placeholder='Enter the must have skills'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='skills'
              value={skillInput}
              onKeyDown={handleSkillAdd}
              onInput={handleSkillAdd}
              onChange={(e) => setSkillInput(e.target.value)}
            />
          </div>
          <div className='h-[20px] flex space-x-3 my-2 ml-2 md:ml-45'>
            {formData.skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className='flex items-center bg-red-100 rounded-md overflow-hidden'>
                  <span className='px-2 py-1 text-black text-xs md:text-sm flex flex-wrap gap-2'>{skill}</span>
                  <button
                    className='bg-[#ED5353] px-1 py-1 text-white text-xs md:text-sm'
                    onClick={() => handleRemoveSkill(skill)}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>Company Size</label>
            <select
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='companySize'
              value={formData.companySize}
              onChange={handleChange}>
              <option>Select</option>
              <option>0-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1000</option>
              <option>1K+</option>
            </select>
          </div>

          <div className='flex items-center space-x-4'>
            <label className='w-1/3 md:w-1/4 font-semibold'>
              Additional Information
            </label>
            <input
              type='text'
              placeholder='Enter the additional information'
              className='w-3/4 px-2 md:px-3 py-1 md:py-2 border rounded-md'
              name='information'
              value={formData.information}
              onChange={handleChange}
            />
          </div>

          <div className='flex justify-end gap-5 mt-4'>
            <button
              type='button'
              className='cursor-pointer px-3 md:px-5 py-1 md:py-2 border rounded-md text-gray-500' onClick={()=>navigate("/")}>
              Cancel
            </button>
            <button
              type='submit'
              className='cursor-pointer px-3 md:px-5 py-1 md:py-2 bg-[#ED5353] text-white rounded-md'>
              {id?"Edit":"+ Add"} Job
            </button>
          </div>
        </form>
      </div>
      <div className='hidden md:block w-[40vw]  text-white'>
        <h2 className='absolute top-10 right-30 text-3xl font-semibold mb-4'>
          Recruiter add job details here
        </h2>
        <div className='rounded-lg flex items-center justify-center'>
          <img src={img} alt='Illustration' />
        </div>
      </div>
    </div>
  );
};

export default AddJob;
