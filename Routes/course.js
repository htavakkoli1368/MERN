
const {Course,ValidationCourse} = require('../Models/courseModel.js')
const _ = require("lodash");
const  auth = require('../MiddleWare/auth.js'); 
const express = require('express');  
const router =express.Router(); 

router.post("/",auth,async (req,res)=>{
    const {error} = ValidationCourse(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    let  course = await Course.findOne({name:req.body.name});
    if(course) return res.status(400).send("this Course already register");
    course  = new Course(_.pick(req.body,["name","author","isPublished"])) 
    course = await course.save();  
    res.send("true");
 })

 module.exports =router;

 