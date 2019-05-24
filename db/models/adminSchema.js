const mongoose = require('../connection');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    'userid':{type:String,required:true,unique:true},
    'password':{type:String,required:true},
    'role':{type:String,default:"user"},
    'isFirstTime':{type:String,default:'N'},
});
const model = mongoose.model('admins',adminSchema);
module.exports = model;