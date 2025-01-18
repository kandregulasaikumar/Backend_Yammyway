const express = require('express');
const mongoose =require('mongoose');
const app =express()

mongoose.connect('mongodb+srv://saikumarkandregula66:saikumar1234@cluster0.7mqrl.mongodb.net/YummyWay?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Mongodb Connected successfully!")
})
.catch((error)=>console.log(error+"problum"))

app.get('/',(req,res)=>{
    res.send("hello")
})


app.listen(5000,()=>{
    console.log("the server is running")
})