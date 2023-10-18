 
const Joi = require('joi')
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Users = require('./Routes/users.js');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use(express.json());
app.use("/api/users",Users);


const port =process.env.PORT || 5000 ;
app.listen(port,()=>console.log(`we are listening to port ${port}.........`))

 

 



 
 

 
 
 
 
  