const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("connected");
}
const courseSchema = new  mongoose.Schema({
   name:{
       type:String,
       required:true,
       minlength:5,
       maxlength:50,
   },
   author:{
       type:String,
       required:true,
       minlength:5,
       maxlength:255       
   }, 
   isPublished:{
    type:Boolean   
   }
    
});
 
const  Course = mongoose.model("Course",courseSchema);

function validationCourse(course){
    const schema ={
        name : Joi.string().min(5).max(50).required(),
        author : Joi.string().min(5).max(255).required(),        
        isPublished : Joi.boolean()        
    }
    return Joi.validate(course,schema)
}
 
 exports.Course =Course ;
 exports.ValidationCourse =validationCourse ;