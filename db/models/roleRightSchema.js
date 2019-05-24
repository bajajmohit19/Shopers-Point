const mongoose = require('../connection');
const Schema = mongoose.Schema;
const roleRightSchema = new Schema({
    'role':{type:String,default:"user"},
    'rights':{type:Array,default:[]},
});
const model = mongoose.model('roleRights',roleRightSchema);
module.exports = model;