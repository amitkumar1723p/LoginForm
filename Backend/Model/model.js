 import mongoose from "mongoose";
 const UserDetail = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please Enter Your Email"]
    },
    
    password: {
        type: String,
        trim: true,
        required: [true, "Please Enter Your Email"]
    },

 }) 
  const Usermodel = mongoose.model(' UserDetail', UserDetail)
 export default Usermodel;
  