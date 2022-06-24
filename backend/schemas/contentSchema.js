const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
    name:{
        type:String,
        require
    },
    category:{
        type:String,
        require
    },
    rating:{
        type:String,
        require
    },
    type:{
        type:String,
        require
    },
    description:{
        type:String,
        require
    },
    duration:{
        type:String,
        require
    },
    poster:{
        type:String,
        require
    },
    trailer:{
        type:String,
        require
    }
})

const contentModel = mongoose.model("contents",contentSchema);
module.exports = contentModel;