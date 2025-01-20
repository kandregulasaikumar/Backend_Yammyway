const express = require('express')
const dotEnv =require('dotenv')
const mongoose =require('mongoose')
const cors =require('cors')
const vendorRoutes =require('./routes/vendorRoutes')
const firmRoutes =require('./routes/firmRoutes')
const productRoutes =require('./routes/productRoutes')

const path =require('path')

const bodyparser =require('body-parser')

const app = express()

const port =process.env.port || 4000;

dotEnv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongodb Connected successfully!")
})
.catch((error)=>console.log(error+"problum"))

app.use(bodyparser.json())

app.use(cors())

app.use('/vendor',vendorRoutes);

app.use('/firm',firmRoutes);

app.use('/product',productRoutes);

app.use('/uploads',express.static)

app.listen(port, () => {
    console.log(`the server is running at ${port}`)
})

app.use('/',(req,res)=>{
    res.send("<h1>hello welcome to the Yammyway 2</h1>")
})