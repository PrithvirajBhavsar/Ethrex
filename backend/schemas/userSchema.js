const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    }
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;