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
const courseSchema = new  mongoose.Schema({
   name:{
       type:String,
       lowercase:true,
       trim:true,
       required:function(){return this.isPublished}
   },
   author:String,
   tags:{
       type:Array,
       validate:{
           validator:function(v)
           { return v && v.length > 0 ; },
           message:"tags should have atleast one value"

       }
   },
   date:{type:Date,defaultL:Date.now()},
   isPublished:Boolean,
   price:{
       type:Number,
       min:2,
       max:100,
       get:v=>Math.sqrt(v),
       set:v=>Math.sqrt(v)
   }
});

const  Course = mongoose.model("course",courseSchema);
// let courses =[
//    {id:1,names:"course1"},
//    {id:2,names:"course2"},
//    {id:3,names:"course3"}
// ]
app.get('/', async (req, res)=> {
   const course = await Course.find();
  res.send(course)
})
// app.get("/api/courses",(req,res)=>{
//    res.send(courses);
// })
app.post("/api/courses",async (req,res)=>{
 
   let  newcourse  = new Course({
      name:req.body.name,
      author:req.body.author,
      tags:req.body.tags,
      isPublished:req.body.isPublished,
      price:req.body.price
  })         
  console.log(newcourse);   
  newcourse = await newcourse.save();
  console.log(newcourse);   
   res.send(newcourse);
})
// app.get("/api/courses/:id",(req,res)=>{
//    var fincourse = courses.find(c=>c.id === parseInt(req.params.id));
//    if(!fincourse) res.status(404).send("the requested course does not exist")
//    else res.send(fincourse)
// })
const port =process.env.PORT || 5000 ;
app.listen(port,()=>console.log(`we are listening to port ${port}.........`))