const Role = require('../models/roles.model.js');

async function findRole(rolename){

    return await Role.findOne({ role_name: rolename }, function (err, role) {
        if (err) return err;
        return role;
    });
    
};



module.exports = {findRole};