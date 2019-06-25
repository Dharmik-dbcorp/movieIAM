var mongoose = require('mongoose');  

var MovieSchema = new mongoose.Schema({  
  name: String,
  imdb_score: Number,
  director: String,
  genre: [{
    type: String}],
  popularity: Number,
  isDeleted: Boolean
});

mongoose.model('Movie', MovieSchema, 'movies');

module.exports = mongoose.model('Movie');