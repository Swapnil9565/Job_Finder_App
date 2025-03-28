const express = require("express");
const JobModel = require("../Models/JobModel");
const authMiddleware=require("../Middlewares/authMiddleware");
const router = express.Router();


//Create Jobs
router.post("/addJob",authMiddleware, async (req, res) => {
  const {
    companyName,
    logoUrl,
    position,
    CTC,
    experience,
    jobType,
    jobMode,
    location,
    jobDesc,
    aboutCompany,
    skills,
    companySize,
    information,
  } = req.body;

  try {
    const job = await JobModel.create({
        companyName,
        logoUrl,
        position,
        CTC,
        experience,
        jobType,
        jobMode,
        location,
        jobDesc,
        aboutCompany,
        skills,
        companySize,
        information,
        createdBy:req.user.id
      });
    
      res.status(201).json({message:"Job Added Successfully",job});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

//Fetch all job records
router.get("/allJobs",async(req,res)=>{
    try {
        const allJobs=await JobModel.find();
    
        if(!allJobs){
            return res.status(404).json({message:"Jobs not found"});
        }
        res.status(200).json({message:"All Jobs fetched successfully",allJobs});
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//Fetch job by id
router.get("/jobDetails/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const jobDetails=await JobModel.findById(id);
    
        if(!jobDetails){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json({message:"Job details fetched successfully",jobDetails});
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// Update job details
router.put("/editJob/:id",authMiddleware,async(req,res)=>{
    try{
    const updateJob=await JobModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updateJob){
        return res.status(404).json({message:"Job not found"});
    }
    res.status(200).json({message:"Job details updated successfully",updateJob});
}catch(error){
    res.status(500).json({message:error.message});
}
})
module.exports=router;