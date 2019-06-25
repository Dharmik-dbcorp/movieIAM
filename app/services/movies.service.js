const Movie = require('../models/movies.model.js');

async function getMovieByName(name){

    return await Movie.findOne({ name: name, isDeleted: false }, function (err, movie) {
        
        console.log(err)
        if (err) return err;
        return movie;

    });

};

async function getAllMovies(){
    
    return await Movie.find({ isDeleted: false }, function (err, movies) {
        if (err) return err;
        return movies;
    });
}

async function deleteMovieByName(name){

    return await Movie.where({ name: name }).findOneAndUpdate({ $set: {isDeleted : true }}, function (err, result) {
        if (err) return err;
        
        return result;
    });

}

async function addMovie(movie){
    
    

    return await Movie.create({
        name: movie.name,
        imdb_score: movie.imdb_score,
        director: movie.director,
        genre: movie.genre,
        popularity: movie['99popularity'],
        isDeleted: false
    },
    function(err, movie){
        if(err) return err;
        console.log(movie)
        return movie;
    });
}

async function updateMovie(name, movie){
    

    return await Movie.findOneAndUpdate({name:name},
        movie,
        {new: true},
        function(err, movie){
            if(err) return err;
            return movie;
        });

}


module.exports ={ 
    getMovieByName,
    getAllMovies,
    deleteMovieByName,
    addMovie,
    updateMovie
};
