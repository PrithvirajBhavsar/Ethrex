const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        require
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    content:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contents"        
    }
})

const commentModel = mongoose.model("comments",commentSchema);
module.exports = commentModel;