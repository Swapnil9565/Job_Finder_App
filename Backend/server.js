const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");

const authRouter=require("./Routes/AuthRoute")
const jobRouter=require("./Routes/JobRoute")

const connectDB=require("./Config/DBConfig");

dotenv.config();

const app=express();

let allowedOrigins =process.env.NODE_ENV === "development"?[process.env.DEV_ORIGIN]:[process.env.PROD_ORIGIN]

app.use(
    cors({
      origin:allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"], 
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
//Routers
app.use("/api/auth",authRouter);
app.use("/api/jobs",jobRouter);
app.get("/",(req,res)=>{
    res.send("Welcome page");
})
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDB();
})