const express= require("express");
const user = require("./src/user");
const blog = require("./src/blog");
const cors = require("cors");
const project = require("./src/project");
const messanger = require("./src/messanger");
const multer= require("multer");
const cookieParser = require('cookie-parser');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Projects_Hackaton/bitfund-backend/assets')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)+".png") //Appending extension
    }
});

const uploadProduct=multer({ storage : storage});
const app = express();
const port = 8080;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.post("/user/register",async (req,res) => {
    let ans = await user.register(req);
    res.status(200).json(ans);
});
app.get("/user/verification",async (req,res) => {
    let ans = await user.verify(req);
    res.status(200).json(ans);

});
app.get("/project/:project_id",async(req,res)=> {
   let ans = await project.getProject(req);
   res.status(200).json(ans);
});
app.get("/project/",async(req,res)=>{
    let ans= await project.getProject(req);
    res.status(200).json(ans);
});
app.get("/project/:project_id/blog",async(req,res)=> {
    let ans=await blog.getBlog(req);
    res.status(200).json(ans);
});
app.get("/project/:project_id/blog/:blog_id",async(req,res)=> {
    let ans=await blog.getBlog(req);
    res.status(200).json(ans);

});
app.post("/project",async(req,res)=> {
    let ans = await project.addProject(req);
    res.status(200).json(ans);
});
app.post("/project/:project_id/blog/:blog_id",async(req,res)=> {
    let ans =await blog.addRecordToBlog(req);
    res.status(200).json(ans);
});
app.post("/project/:project_id/blog",async (req,res)=> {
    let ans = await blog.addBlog(req);
    res.status(200).json(ans);
});
app.get("/messanger/:conversation_id",async(req,res)=> {
    let ans = await  messanger.getMessages(req);
    res.status(200).json(ans);
});
app.post("/messanger/:conversation_id",async(req,res)=> {
    let ans = await messanger.sendMessage(req);
    res.status(200).json(ans);
});
app.get("/user/login", async (req,res) => {
    let ans = await user.login(req);
    res.status(200).json(ans);

});
app.get("/wallet",async (req,res)=> {
   let ans= await wallet.getWallet(req);
   res.status(200).json(ans);
});
app.post("/wallet",async(req,res)=> {
    let ans= await wallet.payByWalletId(req);
    res.status(200).json(ans);
});
app.get("/user/check",async(req,res) => {
   let ans= await user.check(req);
   res.status(200).json(ans);
});
app.listen(port);