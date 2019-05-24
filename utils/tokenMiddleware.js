const tokenOperations = require('./token');
const config = require('./config');
const middleware = (req,res,next)=>{
    const token = req.headers['auth-token'];
    const role = req.headers['role'];
    //console.log('TokenMiddleware');
    if(token){
        console.log('TokenMiddleware');
        let decoded = tokenOperations.verifyToken(token,role);
        if(!decoded){
            res.status(401).json({status:config.status.ERROR,message:'Invalid Token',});
        }
        else{
            next();
        }
    }
    else{
        console.log('Tokemiddleware err');
        //console.log('else');
        res.status(401).json({status:config.status.ERROR,message:'U r UnAuthorized to access this Page',});
    }
}
module.exports = middleware;