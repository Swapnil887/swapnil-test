const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticattion = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.send("You have to login first")
    }
    next()
}

module.exports = authenticattion