const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodPostSchema = new Schema({
    restaurantName:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: false
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports=mongoose.model('FoodPost', foodPostSchema)