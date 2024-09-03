const userModel = require("../models/userModel");
const bcrypt  = require("bcrypt");

//create user register user
exports.registerController=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username|| !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser){
            return res.status(401).json({
                success:false,
                message:"User already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // password = hashedPassword;
        const user = new userModel({username,email,password:hashedPassword});
        await user.save();
        return res.status(201).json({
            success:true,
            message:"New User Created",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Register callback",
            error,
        });
    }
}

//get all users
exports.getAllUser=async(req,res)=>{
    try {
        const users = await userModel.find({});
        return res.status(200).json({
            userCount :users.length,
            success:true,
            message:"All users data",
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in get all users",
            error,
        });
    }
}



//login
exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).json({
                success:false,
                message:"Email is not registered",
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Please enter valid password",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Log in successfull",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Login Callback",
            error,
        });
    }
}