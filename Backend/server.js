const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");

const authRouter=require("./Routes/AuthRoute")
const jobRouter=require("./Routes/JobRoute")

const connectDB=require("./Config/DBConfig");

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

app.use(
    cors({
      origin: "http://localhost:5173", 
      methods: ["GET", "POST", "PUT", "DELETE"], 
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

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