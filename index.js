const mongoose = require("mongoose")
const express = require("express");
const { connection } = require("./config/config");
const userRouter = require("./route/userRoute");
const schoolRoute = require("./route/schoolRoute");
require("dotenv").config()


const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello world!")
})

app.use("/user",userRouter)
app.use("/school",schoolRoute)


app.listen(process.env.PORT,async()=>{
    try{
    await connection
    console.log("server is listening on port " + process.env.PORT)
    }
    catch(err){
        console.log("connection failed")
    }
})


