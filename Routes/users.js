const {User,ValidationUser} = require('../Models/userModel.js')
const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require("bcrypt");
const _ = require("lodash"); 
const express = require('express');
const  auth = require('../MiddleWare/auth.js');   
const router =express.Router(); 

router.get("/me",auth, async (req,res)=>{
  const user = await User.findById(req.user._id).select("-password");
  res.send(user); 
})

router.post("/",async (req,res)=>{
    const {error} = ValidationUser(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    let  user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("this email already register");
     user  = new User(_.pick(req.body,["name","email","password"]))    
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash( user.password ,salt);
   user = await user.save();      
   const token = user.generateToken();
    res.header("x-auth-token",token).send(_.pick(user,["_id","name","email"]));
 })

 module.exports =router;