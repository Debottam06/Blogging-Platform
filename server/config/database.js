const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect=async()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`);
        
    }).catch((error)=>{
        console.log(`MongoDB connection error ${error}`);
        process.exit(1);
    })
}