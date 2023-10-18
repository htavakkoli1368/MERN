const {User,ValidationUser} = require('../Models/userModel.js')
const express = require('express') 
const mongoose = require('mongoose');
const router =express.Router(); 

router.post("/",async (req,res)=>{
    const {error} = ValidationUser(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    let  user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("this email already register");
     user  = new User({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password      
   })    
   user = await user.save();      
    res.send(user);
 })

 module.exports =router;