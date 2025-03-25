const express=require("express");
const dotenv=require("dotenv");
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("get page");
})
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})