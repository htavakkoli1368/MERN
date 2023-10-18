const Joi = require('joi')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new  mongoose.Schema({
   name:{
       type:String,
       required:true,
       minlength:5,
       maxlength:50,
   },
   email:{
       type:String,
       required:true,
       minlength:5,
       maxlength:255,
       unique:true
   },
   password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1024,
    unique:true
   }  
});

const  User = mongoose.model("User",userSchema);

function validateUser(user){
    const schema ={
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user,schema)
}
 
 exports.User =User ;
 exports.ValidationUser =validateUser ;
 