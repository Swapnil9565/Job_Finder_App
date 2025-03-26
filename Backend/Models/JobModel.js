const mongoose=require("mongoose");

const jobSchema=mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:["Full Time","Part Time","Internship"],
        required:true
    },
    jobMode:{
        type:String,
        enum:["Remote","Office","Hybrid"],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobDesc:{
        type:String,
        required:true
    },
    aboutCompany:{
        type:String,
    },
    skills:{
        type:[String],
        required:true
    },
    information:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    postedOn:{
        type:Date,
        default:Date.now
    }

},{timeStamps:true})

module.exports=mongoose.model("job",jobSchema);