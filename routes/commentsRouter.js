const express = require('express')
const commentsRouter = express.Router()
const Comment = require('../models/comments')
const {expressjwt: jwt} = require('express-jwt')
const { populate } = require('../models/foodPost')

// Get All comments including those not made by user 
commentsRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(comments)
    })
    .populate('user')
})

// get one - so only get comments made by the userid
commentsRouter.get('/:userId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{//denotes we're getting a user specific issue
    Comment.find({user: req.params.userId}, (err,comment)=>{//only finding comment w/matchin user auth id
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(comment)
    })
})

//gets post by the foodpost id
commentsRouter.get('/:foodPostId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{
    console.log('req',req.params)
    Comment.find({foodPost:req.params.foodPostId}, (err,comment)=>{
        
        if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(comment)
    })
    
})

//add a new comment to feed (post)  //jwt meant that user must be logged in to perform task 
commentsRouter.post('/:foodPostId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{
    req.body.user = req.auth._id
    req.body.foodPost = req.params.foodPostId
    const newComment = new Comment(req.body)
    newComment.save((err,savedComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment //jwt meant that user must be logged in to perform task 
commentsRouter.delete('/:commentId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{
    Comment.findOneAndDelete({_id: req.params.commentId, user: req.auth._id}, //find post by this id and delete by the user who made the post 
        (err,deletedComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted post: ${deletedComment.comment}`)
    })
})


//edit/update new comment  //jwt meant that user must be logged in to perform task 
commentsRouter.put('/:commentId',jwt({secret: process.env.SECRET, algorithms: ['HS256']}), (req,res,next)=>{
    Comment.findOneAndUpdate({_id: req.params.commentId, user: req.auth._id},////only the user that made this can update this 
    req.body,
    {new: true},
    (err,updatedComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(201).send(updatedComment)
    })
})

//dislikes
commentsRouter.put('/downVote/:commentId', jwt({secret: process.env.SECRET, algorithms: ['HS256']}),(req,res,next)=>{
    Comment.findOneAndUpdate(
        {_id: req.params.commentId},
        {$addToSet: {dislikes: req.auth._id},
        $pull: {likes: req.auth._id}},
        {new: true}
        )
        .populate('user')
        .exec((err, updatedComment)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        })
}
)

commentsRouter.put('/upVote/:commentId', jwt({secret: process.env.SECRET, algorithms: ['HS256']}), (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId},
        {$addToSet: {likes: req.auth._id}, //$addToSet operator to adds the authenticated user's ID to the likes array 
        $pull: {dislikes: req.auth._id}},//$pull operator to removes the authenticated user's ID from the dislikes array.
        {new: true}
    )
    .populate('user') //This method is used to populate the user field of the found comment with the corresponding user object.
    //Mongoose will replace the user field in the comment with the actual user object, using the reference and the user's ID.
    .exec((err, updatedComment) => {//executes the query and provides a callback function to handle the results.
        if (err) {
        res.status(500);
        return next(err);
        }
        return res.status(201).send(updatedComment);
    });
    });

module.exports = commentsRouter