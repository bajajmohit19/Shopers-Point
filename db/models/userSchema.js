const mongoose = require('../connection');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    'userid':{type:String,required:true,unique:true},
    'password':{type:String,required:true},
    'role':{type:String,default:"user"},
    'username':{type:String,required:true},
    'gender':{type:String,required:true},
    'mobileno':{type:Number,required:true},
    'email':{type:String,required:true},
    'picture':{type:String,default:'#'}
});
const model = mongoose.model('users',userSchema);
module.exports = model;