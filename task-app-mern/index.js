const express=require('express');
const mongoose =require('mongoose');
const dotenv=require('dotenv');
const app=requie('./app');


dotenv.config({path:"./config.env"});

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connection Successfull!!!");
}).catch((err)=>{
    console.log("Following error occured while connecting");
    console.log(err);
})
 
const PORT=process.env.PORT || 3000;
app.listen(PORT,(err,res)=>{
    if(err){
        console.log(err);
    }
    console.log("Server Started at Port:"+PORT);
});
