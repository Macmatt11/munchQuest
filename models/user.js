const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    memberSince:{
        type: Date,
        default: Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

//pre saved hook to encrpt user passwords on signup
//fires thes lines of codes first before saved 
userSchema.pre('save', function(next){
    const user = this 
    if(!user.isModified('password'))
    return next()
    bcrypt.hash(user.password, 10, (err,hash)=>{
        if(err)return next(err)
        user.password = hash
        next()
    })
})

//method to check encrypted pw on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err,isMatch)=>{
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

 //method to remove users pw for token & sending res to frontend
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user 
}

module.exports = mongoose.model('User', userSchema)