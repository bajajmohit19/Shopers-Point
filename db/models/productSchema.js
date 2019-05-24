const mongoose = require('../connection');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    'name':{type:String,required:true,unique:true},
    'description':{type:String,required:true},
    'price':{type:Number,required:true},
    'quantity':{type:Number,default:1},
    'img':{type:String,required:true},
});
const model = mongoose.model('products',productSchema);
module.exports = model;