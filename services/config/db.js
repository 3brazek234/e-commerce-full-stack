const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  }catch(err){
   console.error("db doesnt connect", err);
  }
}
module.exports = connectDB;