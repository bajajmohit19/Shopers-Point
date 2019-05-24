const mongoose = require('mongoose');
const config = require('../utils/config');
mongoose.connect(config.dburl,(err)=>{
    if(err){
        console.log('Error in DB connection.',err);
    }
    else{
        console.log('Connection created');
    }
});
module.exports = mongoose;