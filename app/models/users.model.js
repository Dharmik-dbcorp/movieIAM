var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  username: String,
  password: String,
  role_name: String,
  resource:{
      movies:[String]
  }

});

mongoose.model('User', UserSchema, 'users'); //collection name 3rd param 

module.exports = mongoose.model('User');