const jwt = require('jsonwebtoken');
const tokenOperations = {
    generateToken(token,secret){
        return  jwt.sign({token},secret);
        //console.log(Token);
    },
    verifyToken(token,secret){
        let decoded;
        try { decoded = jwt.verify(token,secret) }
        catch(e){
            decoded = null;
        }
        return decoded;
        //console.log(decoded);
    }
}
module.exports = tokenOperations;
/* const t = tokenOperations.generateToken({key:'value'});
tokenOperations.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2YWx1ZSIsImlhdCI6MTU1NDI2MTM5M30.K4fLhQmKQAmZyv-_gMeoBXMAOLmF5gAWcKaSLTftBgo'); */