const express = require('express')
const foodPostRouter = express.Router()
const FoodPost = require('../models/foodPost')
const {expressjwt: jwt} = require('express-jwt')
require('dotenv').config()

// Get All posts including those not made by user (public)
foodPostRouter.get("/", (req, res, next) => {
    FoodPost.find((err, posts) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(posts)
    })
})

//get post by user id only (profile)
foodPostRouter.get('/user',jwt({secret: process.env.SECRET, algorithms: ['HS256']}), (req,res,next)=>{
    FoodPost.find({user: req.auth._id}, (err,post)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(post)
    })
})

//add a new post 
foodPostRouter.post('/',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{
    req.body.user = req.auth._id
    const newPost = new FoodPost(req.body)
    newPost.save((err,savedPost)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPost)
    })
})

//edit post 
foodPostRouter.put('/:foodPostId', jwt({secret: process.env.SECRET, algorithms:['HS256']}),(req,res,next)=>{
    FoodPost.findOneAndUpdate({_id: req.params.foodPostId, user: req.auth._id},
    req.body,
    {new: true},
    (err,updatedPost)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedPost)
    }
    )
})

//deletepost
foodPostRouter.delete('/:foodPostId', jwt({secret: process.env.SECRET, algorithms:['HS256']}),(req,res,next)=>{
    FoodPost.findOneAndDelete({_id: req.params.foodPostId, user: req.auth._id}, (err,deletedPost)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted post:${deletedPost} `)
    })
})

//likes post 
foodPostRouter.put('/upVote/:foodPostId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req, res, next) => {
    FoodPost.findOneAndUpdate(
        {_id: req.params.foodPostId},
        { $addToSet: {likes: req.auth._id },
        $pull : {dislikes: req.auth._id}},
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

//dislikes post 
foodPostRouter.put('/downVote/:foodPostId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req, res, next) => {
    FoodPost.findOneAndUpdate(
        {_id: req.params.foodPostId},
        { $addToSet: { dislikes: req.auth._id },
        $pull : {likes: req.auth._id}},
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

module.exports = foodPostRouter
