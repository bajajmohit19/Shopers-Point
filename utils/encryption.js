const bcrypt = require('bcryptjs');
const encrypt={
    encryption(plainPassword){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(plainPassword,salt);
        return hash;
    },
    compare(plainPassword,hashPassword){
        return bcrypt.compareSync(plainPassword,hashPassword);
    },
}
module.exports = encrypt;