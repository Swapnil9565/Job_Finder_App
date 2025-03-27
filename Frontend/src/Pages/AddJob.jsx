import React from 'react'
import img from "../Assets/JobPosting.png";
const AddJob = () => {
  return (
    <div className='flex justify-between'>
    <div className="w-[40vw] p-10 bg-white">
        <h1 className="text-3xl font-bold mb-6">Add job description</h1>
        <form class="space-y-2">
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Company Name</label>
                <input type="text" placeholder="Enter your company name here" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Add logo URL</label>
                <input type="text" placeholder="Enter the link" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Job Position</label>
                <input type="text" placeholder="Enter job position" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Monthly Salary</label>
                <input type="number" placeholder="Enter Amount in rupees" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Job Type</label>
                <select class="w-3/4 px-3 py-2 border rounded-md">
                <option>Select</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                </select>
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Remote/Office</label>
                <select class="w-3/4 px-3 py-2 border rounded-md">
                    <option>Select</option>
                    <option>Remote</option>
                    <option>Office</option>
                </select>
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Location</label>
                <input type="text" placeholder="Enter Location" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Job Description</label>
                <textarea placeholder="Type the job description" class="w-3/4 px-3 py-2 border rounded-md"></textarea>
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">About Company</label>
                <textarea placeholder="Type about your company" class="w-3/4 px-3 py-2 border rounded-md"></textarea>
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Skills Required</label>
                <input type="text" placeholder="Enter the must have skills" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex items-center space-x-4">
                <label class="w-1/4 font-semibold">Additional Information</label>
                <input type="text" placeholder="Enter the additional information" class="w-3/4 px-3 py-2 border rounded-md" />
            </div>
            
            <div class="flex justify-end gap-5 mt-4">
                <button type="button" class="cursor-pointer px-5 py-2 border rounded-md text-gray-500">Cancel</button>
                <button type="submit" class="cursor-pointer px-5 py-2 bg-[#ED5353] text-white rounded-md">+ Add Job</button>
            </div>
        </form>
    </div>
    <div className="w-[40vw]  text-white">
        <h2 className="absolute top-10 right-30 text-3xl font-semibold mb-4">Recruiter add job details here</h2>
        <div className="rounded-lg flex items-center justify-center">
            <img src={img} alt="Illustration" />
        </div>
    </div>
    </div>
  )
}

export default AddJob