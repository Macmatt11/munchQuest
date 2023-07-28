const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//signup
authRouter.post('/signup', (req,res,next)=>{
    User.findOne({username:req.body.username.toLowerCase()}, (err,user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){//user aready exists 
            res.status(403)
            return next(new Error('Username Already Used'))
        }
        const newUser = new User(req.body)
        newUser.save((err,savedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            //payload and secret
            const token = jwt.sign(savedUser.withoutPassword(),process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

//login route (post) if member already
authRouter.post('/login', (req,res,next)=>{
    User.findOne({username: req.body.username.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){//if not the right user
            res.status(403)
            return next(new Error('Username or Password incorrect'))
        }
        user.checkPassword(req.body.password, (err,isMatch)=>{
            if(err){
                res.status(403)
                return next(new Error('Username or Password incorrect'))
            }
            if(!isMatch){
                res.status(403)
                return next( new Error('Username or Password incorrect'))
            }//no err then do following
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token, user: user.withoutPassword()})
        })
    })
})



module.exports = authRouter