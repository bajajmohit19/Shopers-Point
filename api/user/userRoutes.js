const userRoutes = require('express').Router();
const userOperations = require('../../db/helpers/userOperations');
const encrypt = require('../../utils/encryption');
userRoutes.post('/register',(req,res)=>{
    console.log(req.body)
    let uid = req.body.userid;
    let pwd = encrypt.encryption(req.body.pwd);
    let username = req.body.username;
    let gender = req.body.gender;
    let email = req.body.email;
    let mobileno = parseInt(req.body.mobileno);
    const userObject = {userid:uid,password:pwd,username,gender,email,mobileno};
    console.log(userObject);
    userOperations.add(userObject,res);
});
userRoutes.get('/isFirstTime',(req,res)=>{
    userOperations.findFirstTime(res);
})
userRoutes.post('/login',(req,res)=>{
    let uid = req.body.userid;
    let pwd = req.body.pwd;
    const userObject = {userid:uid,password:pwd};
    userOperations.find(userObject,res);
});
userRoutes.post('/adminlogin',(req,res)=>{
    let uid = req.body.userid;
    let pwd = req.body.pwd;
    console.log("admin",uid,pwd);
    const adminObject = {userid:uid,password:pwd};
    userOperations.adminLogin(adminObject,res);
});
userRoutes.get('/checkuser',(req,res)=>{
    let id = req.query.id;
    console.log(id);
    userOperations.findUser({_id : id } , res);
});
userRoutes.post('/checkproduct',(req,res)=>{
    let id = req.body;
    userOperations.checkProduct(id,res);
});
userRoutes.post('/buyproduct',(req,res)=>{
    userOperations.buy(req.body,res);
});
userRoutes.post('/updateprofile',(req,res)=>{
    let id = req.body._id;
    let username = req.body.username;
    let mobileno = req.body.mobileno;
    let email = req.body.email;
    let gender = req.body.gender;
    let obj = {username,email,gender,mobileno};
    userOperations.updateProfile(id,obj,res);
});
userRoutes.post('/changepassword',(req,res)=>{
    console.log(req.body)
    let id = req.body.id;
    let obj = {old:req.body.old,new:encrypt.encryption(req.body.new)};
    userOperations.changePassword(id,obj,res);
})
module.exports = userRoutes;
