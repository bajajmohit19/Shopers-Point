const adminRoutes = require('express').Router();
const adminOperations = require('../../db/helpers/adminOperations');
const multer = require('multer');
const encrypt = require('../../utils/encryption');
let fileName = '';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log('File isssss ',file);
        fileName = file.fieldname + '_' + datetimestamp + '.jpg';
        cb(null, fileName);
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');

adminRoutes.get('/dashboard',(req,res)=>{
    //location.href = 'dashboard.html';
    res.status('200').json({status:'S'});
});
adminRoutes.post('/changeAdminPassword',(req,res)=>{
    const oldPwd = req.body.oldPwd ;
    const newPwd = encrypt.encryption(req.body.newPwd) ;
    console.log('IN change password ',newPwd,oldPwd);
    adminOperations.changePassword(oldPwd,newPwd,res);
});
adminRoutes.post('/fetchproducts',(req,res)=>{
    adminOperations.fetchAllProducts(res);
});
adminRoutes.post('/fetchorders',(req,res)=>{
    adminOperations.fetchAllOrders(res);
});
adminRoutes.post('/fetchids',(req,res)=>{
    adminOperations.fetchIds(req.body,res);
});
adminRoutes.post('/fetchusers',(req,res)=>{
    adminOperations.fetchUsers(res);
});
adminRoutes.post('/fetchimage',(req,res)=>{
    let fileUrl = req.body.url;
    adminOperations.fetchimage(fileUrl,res);
});
adminRoutes.post('/addproduct',(req,res)=>{
    let productObject = req.body;
    productObject.img = './uploads/'+fileName;
    fileName = "";
    adminOperations.addProduct(productObject, res);
});
adminRoutes.post('/updateproduct',(req,res)=>{
    let productObject = req.body;
    if(fileName != ''&& fileName.length >5){
        productObject.img = './uploads/'+fileName;
        fileName = "";
    }
    adminOperations.updateProduct(productObject, res);
});
adminRoutes.post('/upload',(req,res)=>{
    console.log('In uploader.',req.product,req.body);
    upload(req,res,function(err){
        if(err){
            console.log('in err::::',err);
             res.status(500).json({status:'E',err});
             return;
        }
         res.status(200).json({status:'S',message:'File recieved successfull'});
    })
});
adminRoutes.post('/deleteproduct',(req,res)=>{
    adminOperations.deleteProduct(req.body,res);
});
adminRoutes.post('/deleteorder',(req,res)=>{
    adminOperations.deleteOrder(req.body,res);
});
module.exports = adminRoutes;