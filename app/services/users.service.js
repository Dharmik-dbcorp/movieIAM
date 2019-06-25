const User = require('../models/users.model.js');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const jwtconfig = require('./../../config/jwt.config.js');


async function getUserByUsername(username){

    return await User.findOne({ username: username}, function (err, user) {
        if (err) return err;
        return user;
    });

};


async function authenticateUser({ username, password }) {

    const user = await getUserByUsername(username)
    
    if (user.username) {
        
        let isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (isPasswordValid)
        {
            const token = jwt.sign({ username : user.username, role: user.role_name }, jwtconfig.secret);
            const { username , role_name  } = user;
            return {
                username,
                role_name,
                token
            };
        }
    }
}


async function modifyPolicy(username,user){
    
    return await User.findOneAndUpdate({username:username},
        user,
        {new: true},
        function(err, user){
            if(err) return err;
            return user;
        });
}


module.exports ={ 
    authenticateUser,
    getUserByUsername,
    modifyPolicy
};