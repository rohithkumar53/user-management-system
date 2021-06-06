const express= require("express");
const app= express();
const dotenv=require("dotenv");
const morgan=require("morgan");
const path=require("path");
const connectDB = require("./server/database/connection");

dotenv.config();
//{path:"config.env"}

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));
//mongodb connection
connectDB();
//parse request to body parser
app.use(express.urlencoded({extended:true}));
// set the view engine
app.set("view engine","ejs");
//load assets
app.use("/css", express.static(path.join(__dirname,"assets/css")));
app.use("/js", express.static(path.join(__dirname,"assets/js")));
app.use("/img", express.static(path.join(__dirname,"assets/img")));

//load routers
app.use("/", require("./server/routes/router"));



app.listen(PORT, ()=>console.log(`Server is running on the port ${PORT}`));
