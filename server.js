const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')


//middleware
app.use(express.json())//converts json to js object 
app.use(morgan('dev'))


// //mongoDB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, ()=> console.log('Connected to DB'))

//routes
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/foodPost', require('./routes/foodPostRouter'))
app.use('/api/comments', require('./routes/commentsRouter'))

// error handling 
app.use((err,req,res,next)=>{
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


//express listen
app.listen(8500,()=>{
    console.log('Server is Running on Port 8500')
})