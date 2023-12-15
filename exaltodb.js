const mongoose = require("mongoose");
var xlsx = require("xlsx");
const Establishment = require("./model/schoolModel");
require("dotenv").config


mongoose
  .connect(
    process.env.mongoUrl
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));


async function exalToDb() {

  const school = xlsx.readFile("schools.xlsx");
  const sheet = school.Sheets[school.SheetNames[1]];
  const schoolData = xlsx.utils.sheet_to_json(sheet);
 var x =  await Establishment.insertMany(schoolData);
 console.log(x) 
 console.log("data successfully saved");
}

// exalToDb()
