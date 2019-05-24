const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require('./utils/adminFirstTimeChecker'));
app.use('/',require('./api/user/userRoutes'));
app.use(require('./utils/tokenMiddleware'));
app.use('/',require('./api/admin/adminRoutes'));
app.listen(1234,()=>{
    console.log('Server Start');
    const adminOperations = require('./db/helpers/adminOperations');
    adminOperations.findAdmin();
});