 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



 const courseSchema = new  mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,defaultL:Date.now()},
    isPublished:Boolean
 });

const  Course = mongoose.model("course",courseSchema);

 
async function createCourse(){
    const  course  = new Course({
        name:"it homes",
        author:"homa",
        tags:["node","frontend"],
        isPublished:false
    })
    
    const result = await course.save();
    console.log(result);
}
// pattern starts with find({author:/^Mosh/}) add i in case insensitive /^Mosh/i
// pattern ends with find({author:/Mosh$/}) add i in case insensitive /Mosh$/i
// pattern contains find({author:/.*Mosh.*/}) add i in case insensitive /.*Mosh.*/i
// or find().or([{author:"hossein"} {name:"gholam"}])
// pattern start with find({author:/^Mosh/}) add i in case insensitive /^Mosh/i
async function getCourse(){
    const courses = await Course.find();
    console.log(courses);
}

getCourse();
  