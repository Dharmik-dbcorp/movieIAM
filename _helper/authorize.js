const expressJwt = require('express-jwt');
const jwt = require('./../config/jwt.config.js');
const secret = jwt.secret

function authorize(roles = []) {
    
    if (typeof roles === 'string') {
        roles = [roles];
    }
    console.log("inside authorize")
    return [
        
        expressJwt({ secret }),
        // authorize based on user role
        (req, res, next) => {

            console.log("tocken authorized")
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = authorize;