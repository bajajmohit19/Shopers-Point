const adminSchema = require('../models/adminSchema');
const userSchema = require('../models/userSchema');
const productsSchema = require('../models/productSchema');
const ordersSchema = require('../models/orderSchema');
const config = require('../../utils/config');
const fs = require('fs');
const path = require('path');
const encrypt = require('../../utils/encryption');
const adminOperations = {
    findFirstTime(res){
        adminSchema.findOne({userid:'admin'},(err,doc)=>{
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
        adminSchema.findOne(userObject,(err,doc)=>{
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
    addAdmin(){
        const admin = {userid:'admin',password:encrypt.encryption('admin'),role:'admin',isFirstTime:'Y'};
        adminSchema.create(admin,(err)=>{
            if(err){
                console.log('Error in admin creation.');
                throw err;
            }
            else{
                console.log('Admin Rocks.');
                this.addAdminRoleRight(admin.role);
            }
        })
    },
    addAdminRoleRight(role){
        const roleRightSchema = require('../models/roleRightSchema');
        const rights = require('../../utils/rights.js');
        const adminRole = {role,rights:rights[role]}
        roleRightSchema.create(adminRole,(err)=>{
            if(err){
                console.log('Error in role rights creation');
                throw err;
            }
            else{
                console.log('Role Rights created.');
            }
        })
    },
    changePassword(oldPwd,newPwd,res){
        adminSchema.findOne({userid:'admin'},(err,doc)=>{
            if(doc){
                console.log('Doc is',doc);
                if(!encrypt.compare(oldPwd,doc.password)){
                    res.status(200).json({status:"S",code:00,message:"old Password not matched."})
                }
                else{
                    console.log('before update');
                    adminSchema.updateOne({userid:'admin'},{$set:{password:newPwd,isFirstTime:'N'}},(err)=>{
                        console.log('In update');
                        if(err){
                            res.status(500).json({status:"E",message:'Error in password change'});
                        }
                        else{
                            res.status(200).json({status:'S',message:'Password changed'});
                        }
                    })
                }
            }
            else{
                console.log('In err',err);
            }
        })
    },
    fetchAllProducts(res){
        productsSchema.find({},(err,doc)=>{
            if(err){
                res.status(500).json({status:"E",message:'Error in product fetch.'});
            }
            else{
                if(doc){
                    res.status(200).json({status:"S",message:'Products found',doc});
                }
            }
        })
    },
    fetchAllOrders(res){
        ordersSchema.find({},(err,doc)=>{
            if(err){
                res.status(500).json({status:"E",message:'Error in product fetch.'});
            }
            else{
                if(doc){
                    res.status(200).json({status:"S",message:'Products found',doc});
                }
            }
        })
    },
    fetchIds(obj,res){
        productsSchema.findById({_id:obj.pid},(err,doc)=>{
            if(err){
                res.status(500).json({status:"E",message:'Error in product id fetch.'});
            }
            else{
                if(doc){
                    userSchema.findById({_id:obj.uid},(err,userdoc)=>{
                        if(err){
                            res.status(500).json({status:"E",message:'Error in product id fetch.'});
                        }
                        else{
                            if(userdoc){
                                res.status(200).json({status:"S",message:'Product id found',product:doc.name,quantity:doc.quantity,price:doc.price,user:userdoc.userid});
                            }
                        }
                    })
                }
            }
        })
    },
    fetchUsers(res){
        userSchema.find({},(err,doc)=>{
            if(err){
                res.status(500).json({status:"E",message:'Error in product id fetch.'});
            }
            else{
                if(doc){
                    res.status(200).json({status:"S",message:'Product id found',doc});
                }
            }
        });
    },
    fetchimage(url,res){
        let fileName = path.join(__dirname+'../../../'+url);
        console.log(fileName);
        let file = fs.readFileSync(fileName);
        console.log(file);
        var base64Image = new Buffer.from(file, 'binary').toString('base64');
        console.log(base64Image);
        res.status(200).json({status:'S',image:base64Image});
    },
    addProduct(productObject,res){
        productsSchema.create(productObject,err=>{
            if(err){
                res.status(500).json({status:'E',message:'Error in adding this product',err});
            }
            else{
                res.status(200).json({status:'S',message:'product added'});
            }
        })
    },
    updateProduct(productObject,res){
        let id = productObject._id;
        delete productObject._id;
        productsSchema.findByIdAndUpdate(id,productObject,err=>{
            if(err){
                res.status(500).json({status:'E',message:'Error in adding this product',err});
            }
            else{
                res.status(200).json({status:'S',message:'product added'});
            }
        })
    },
    deleteProduct(productObject,res){
        productsSchema.findByIdAndDelete(productObject,err=>{
            if(err){
                return res.status(500).json({status:'F',message:'This product is not exist in our DB',err});
            }
            return res.status(200).json({status:'S',message:'Product deleted'});
        })
    },
    deleteOrder(productObject,res){
        ordersSchema.findByIdAndDelete(productObject,err=>{
            if(err){
                return res.status(500).json({status:'F',message:'This order is not exist in our DB',err});
            }
            return res.status(200).json({status:'S',message:'Order deleted'});
        })
    }
}
module.exports = adminOperations;