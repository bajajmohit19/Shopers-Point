const mongoose = require('../connection');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    'pid':{type:String,required:true},
    'uid':{type:String,required:true},
    'quantity':{type:Number,default:1}
});
const model = mongoose.model('orders',orderSchema);
module.exports = model;