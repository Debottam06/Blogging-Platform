const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { dbConnect } = require("./config/database");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
dbConnect();

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`);
    
})

app.get("/",(req,res)=>{
    res.send("node server");
})