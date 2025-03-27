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
    CTC:{
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
    companySize:{
        type:String,
        enum:["0-10","11-50","51-200","201-500","501-1000","1K+"]
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