const jwt = require("jsonwebtoken")
require("dotenv").config()
const mongoose = require("mongoose");
const User = require("../model/userModel");

const authorization = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.send("You have to login first")
        }
    
        const token = authHeader;
        var email = jwt.verify(token,process.env.tokenKey)
        const {role}=await User.findOne({email})
        console.log(role)
        if(role!="admin"){
          return  res.send("you are not authorized")
        }
    next()
}
catch(error){
    res.send(error.message)
}
    
}

module.exports = authorization