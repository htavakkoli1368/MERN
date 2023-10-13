 
const mongoose = require('mongoose');

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

 
async function createCourse(){
    const  course  = new Course({
        name:"Add new column",
        author:"hassan",
        tags:["mongo","mongoose"],
        isPublished:true,
        price:49
    })
    
   try {        
         const result = await course.save();
         console.log(result);    
   } catch (ex) {
    console.log(ex);   
   }
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

// createCourse();
getCourse();
  