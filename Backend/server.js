const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const userroutes =require('./routes/userRoutes');

const todoroute=require("./routes/todoRoutes");

require("dotenv").config();
const app=express();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

app.use('/api/v1/user',userroutes);
app.use('/api/v1/todo',todoroute);



const PORT=process.env.PORT||7000;

const dbconnect = require("./config/database");

dbconnect();

app.get('/',(req,res)=>{
    res.send(
       {
        success:true,
        message:"Todo App"
       }
    )
})

app.listen(PORT,()=>{
     console.log(`Server started successfully at ${PORT}`);
})