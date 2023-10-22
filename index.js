 
const express = require('express')
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const Users = require('./Routes/users.js');
const Courses = require('./Routes/course.js');
const auth = require('./Routes/auth.js'); 

if (!config.get("jwtPrivateKey")) {
  console.error("fatal error");
  process.exit(1);
}
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use(express.json());
app.use("/api/users",Users);
app.use("/api/courses",Courses);
app.use("/api/auth",auth);


const port =process.env.PORT || 5000 ;
app.listen(port,()=>console.log(`we are listening to port ${port}.........`))

 

 



 
 

 
 
 
 
  