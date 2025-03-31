const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const userModel = require("../Models/userModel");

const router=express.Router();

router.post("/signUp",async(req,res)=>{

    const {name,email,mobile,password}=req.body;
    try {

        const user=await userModel.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists with this email"})
        }
    
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const createdUser=await userModel.create({
            name,
            email,
            mobile,
            password:hashedPassword
        })
        const payload={id:createdUser._id}
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY);
        res.status(200).json({message:"User registered Successfully",token,createdUser});
       
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
   try {
    const user=await userModel.findOne({email});
    if(!user){
       return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }
     
    const payload={id:user._id}
    const token=jwt.sign(payload,process.env.JWT_SECRET_KEY);
    res.status(200).json({message:"Login successfully",token,user});
   } catch (error) {
      res.status(500).json({message:error.message})
   }
  
})
module.exports=router;