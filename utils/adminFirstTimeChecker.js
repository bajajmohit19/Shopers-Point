const adminOperations = require('../db/helpers/adminOperations');
const checkFirstTime = (req,res,next)=>{
    console.log(req.url);
    //console.log('session is ',req.session.passport);
    if(req.url == '/isFirstTime'){
        adminOperations.findFirstTime(res);
    }
    else{
        next();
    }
}
module.exports = checkFirstTime;