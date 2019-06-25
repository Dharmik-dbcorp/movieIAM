var mongoose = require('mongoose');  

var RoleSchema = new mongoose.Schema({  
  role_name: String,
  
  permissions: {
    
    moviesReadAccess: Boolean,
    moviesAddAccess: Boolean,
    moviesUpdateAccess: Boolean,
    moviesDeleteAccess: Boolean
  
}
  
});

mongoose.model('Role', RoleSchema, 'roles');

module.exports = mongoose.model('Role');