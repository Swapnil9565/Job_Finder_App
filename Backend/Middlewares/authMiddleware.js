const express=require("express");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"This action is not allowed"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports=authMiddleware;