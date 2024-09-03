const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
    },
    image:{
        type:String,
        required:[true,'image is required'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});


module.exports = mongoose.model("Blog",blogSchema);