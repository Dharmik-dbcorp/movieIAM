const mongoose = require('mongoose');
const dbConfig = require('./../config/database.config.js');
const movies = require('./imdb');
const Movie = require('./../app/models/movies.model');


mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
  seed(movies);

}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


async function seed(movies) {
  
  for (let m of movies) {
  
    await Movie.create({
      name: m.name,
      imdb_score: m.imdb_score,
      director: m.director,
      genre: m.genre,
      popularity: m['99popularity'],
      isDeleted: false
    },
      function (err, movie) {
        if (err){
          console.log(err);
          return;
        };
        console.log('movie created');
        return movie;
      });
    
  }

}
