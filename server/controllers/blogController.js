const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController = async(req,res)=>{
    try {
        const blogs = await blogModel.find({});
        if(!blogs){
            return res.status(400).json({
                success:false,
                message:"No blogs found",
            });
        }
        return res.status(200).json({
            success:true,
            BlogCount:blogs.length,
            message:"All Blogs lists",
            blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while geting blogs",
            error,
        });
    }
}

exports.createBlogController = async(req,res)=>{
    try {
        const {title,description,image,user}=req.body;
        if(!title || !description ||!image ||!user){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const exisitingUser = await userModel.findById(user);
        if(!exisitingUser){
            return res.status(404).json({
                success:false,
                message:"Unable to find user",
            });
        }
        const newBlog = await blogModel({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).json({
            success:true,
            message:"Blog Created",
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating blog",
            error,
        });
    }
}

exports.updateBlogController = async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,description,image}=req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while updating blog",
            error,
        });
    }
}

exports.getBlogByIdController =async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).json({
                success:false,
                message:"Blog not found with this id"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Get single blog",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while getting single blog",
            error,
        });
    }
}

exports.deleteBlogController = async(req,res)=>{
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while deleting blog",
            error,
        });
    }
}

exports.userBlogControlller = async (req, res) => {
    try {
      const userBlog = await userModel.findById(req.params.id).populate("blogs");
  
      if (!userBlog) {
        return res.status(404).send({
          success: false,
          message: "blogs not found with this id",
        });
      }
      return res.status(200).send({
        success: true,
        message: "user blogs",
        userBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "error in user blog",
        error,
      });
    }
  };