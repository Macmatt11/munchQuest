const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const commentsSchema = new Schema({
    comment: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    foodPost: {
        type: Schema.Types.ObjectId,
        ref: 'FoodPost',
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    }, { timestamps: true });
module.exports = mongoose.model('Comment', commentsSchema)