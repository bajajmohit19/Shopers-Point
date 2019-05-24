const userSchema = require('../models/userSchema');
const productSchema = require('../models/productSchema');
const orderSchema = require('../models/orderSchema');
const config = require('../../utils/config');
const encrypt = require('../../utils/encryption');
const userOperations = {
    add(userObject,res){
        console.log('in add');
        userSchema.create(userObject,(err)=>{
            if(err){
                console.log(err);
                if(err.code == 11000){
                    console.log('user exist.');
                    res.status(500).json({status:config.status.ERROR,code:11,message:'Userid already exist.'});
                }
                else res.status(500).json({status:config.status.ERROR,message:'Error in user creation.'});
            }
            else{
                console.log('user created.');
                res.status(200).json({status:config.status.SUCCESS,message:'User Registered.'});
            }
        })
    },
    find(userObject,response){
        console.log("user is ", userObject)
        userSchema.findOne({userid:userObject.userid},(err,doc)=>{
            if(err){
                response.status(500).json({status:config.status.ERROR,message:"Error during find"});
            }
            else{
                console.log("Doc is",doc);
                if(doc!=null){
                    if(encrypt.compare(userObject.password,doc.password)){
                        const tokenOperation = require('../../utils/token');
                        const token = tokenOperation.generateToken(doc.userid,'user');
                        response.status(200).json({token,status:config.status.SUCCESS,message:"Record found.",doc:doc});
                    }
                    else response.status(200).json({status:'F',message:"Invalid user credential."});
                }
                else{
                    response.status(200).json({status:'F',message:"User not exist."});
                }
            }
        })
    },
    findFirstTime(res){
        userSchema.findOne({userid:'admin'},(err,doc)=>{
            if(err){
                res.status(500).json({message:'Internal Error'});
            }
            else{
                if(doc){
                    //console.log(doc);
                    if(doc.isFirstTime == 'Y'){
                        res.status(200).json({status:'Y'});
                    }
                    else res.status(200).json({status:'N'});
                }
                else res.status(500).json({status:'F',message:'System fail'});
            }
        })
    },
    findAdmin(userObject,response){
        userSchema.findOne(userObject,(err,doc)=>{
            if(err){
                response.status(500).json({status:config.status.ERROR,message:"Error during find"});
            }
            else{
                if(!doc){
                    this.addAdmin();
                }
                else{
                    console.log("Admin ready to rock.")
                }
            }
        })
    },
    adminLogin(userObject,response){
        console.log(userObject);
        const adminSchema = require('../models/adminSchema');
        adminSchema.findOne({userid:userObject.userid},(err,doc)=>{
            if(err){
                response.status(500).json({status:config.status.ERROR,message:"Error during find"});
            }
            else{
                if(doc!=null){
                    if(encrypt.compare(userObject.password,doc.password)){
                        const tokenOperation = require('../../utils/token');
                        const token = tokenOperation.generateToken(doc.userid,'admin');
                        response.status(200).json({token,status:config.status.SUCCESS,message:"Admin found.",doc});
                    }
                    else response.status(200).json({status:'F',message:"Invalid user credential."});
                }
                else{
                    response.status(200).json({status:'F',message:"Admin not exist."});
                }
            }
        })
    },
    addAdmin(){
        const admin = {userid:'admin',password:'admin',role:'admin',isFirstTime:'Y'};
        userSchema.create(admin,(err)=>{
            if(err){
                console.log('Error in admin creation.');
                throw err;
            }
            else{
                console.log('Admin Rocks.');
            }
        })
    },
    findUser(id,res){
        userSchema.findById(id,(err,doc)=>{
            if(err){
                res.status(500).json({status:'E',message:'Error in finding user',err});
            }
            else{
                if(doc){
                    res.status(200).json({status:'S',message:'User found',user:doc});
                }
                else res.status(500).json({status:'E',message:'Error in finding user'});
            }
        })
    },
    checkProduct(id,res){
        productSchema.findById(id,(err,doc)=>{
            if(err){
                res.status(500).json({status:'E',message:'Product find error',err});
            }
            else{
                res.status(200).json({status:'S',message:'Product found',doc});
            }
        })
    },
    buy(obj,res){
        console.log(obj);
        let id = obj.id;
        let uid = obj.uid;
        productSchema.findByIdAndUpdate({_id:id},{$inc:{quantity:-1}},{new:true},(err,doc)=>{
            if(err){
                res.status(500).json({status:'E',message:'Product find error',err});
            }
            else{
                orderSchema.findOneAndUpdate({pid:id,uid},{$inc:{quantity:+1}},{upsert:true,new:true},(err,order)=>{
                    if(err){
                        res.status(500).json({status:'E',message:'Order find error',err});
                    }
                    else{
                        res.status(200).json({status:'S',message:'Product found',doc,order});
                    }
                })
            }
        })
    },
    updateProfile(id,user,res){
        console.log('in op',user);
        userSchema.findOneAndUpdate({_id:id},user,{new:true},(err,doc)=>{
            console.log(err,doc);
            if(err){
                res.status(500).json({status:'E',message:'Error in user updation',err});
            }
            else{
                res.status(200).json({status:'S',message:'Profile updated',doc});
            }
        })
    },
    changePassword(id,obj,res){
        userSchema.findOne({_id:id},(err,doc)=>{
            console.log(err,doc);
            if(err){
                res.status(500).json({status:'E',message:'Error in user updation',err});
            }
            else{
                if(doc==null){
                    res.status(200).json({status:'F',message:'Invalid user'});
                }
                else{
                    if(encrypt.compare(obj.old,doc.password)){
                        userSchema.findOneAndUpdate({_id:id},{password:obj.new},{new:true},(err,doc)=>{
                            if(err){
                                res.status(500).json({status:'E',message:'Error in user updation',err});
                            }
                            else{
                                if(doc==null){
                                    res.status(200).json({status:'F',message:'Invalid user'});
                                }
                                else res.status(200).json({status:'S',message:'Profile updated',doc});
                            }
                        })
                    }
                }
            }
        })
    }
}
module.exports = userOperations;