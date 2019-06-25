const express = require('express');
const router = express.Router();
const movieService = require('./../services/movies.service');
const roleService = require('./../services/roles.service');
const userService = require('./../services/users.service');
const authorize = require('./../../_helper/authorize')

router.get('/list', authorize(), fetchAllMovies);
router.get('/:moviename', authorize(), fetchMovieByName);    
router.post('/', authorize(), addMovie);     
router.put('/:moviename', authorize(), updateMovie);     
router.delete('/:moviename', authorize(), deleteMovieByName);     

module.exports = router;


async function fetchMovieByName(req, res, next) {
    
    try{
        if (req.user.role === 'Admin')
        {
            let movie = await movieService.getMovieByName(req.params.moviename)
            if(movie) return res.status(200).json(movie) 
            return res.status(403).json({ message: 'Cant find movie with this name' })
               
        }
        
        let role = await roleService.findRole(req.user.role)
        
        if(role.permissions.moviesReadAccess)
        {
            let user = await userService.getUserByUsername(req.user.username)
            if (user.resource.movies.includes(req.params.moviename))
            {
                let movie = await movieService.getMovieByName(req.params.moviename)
                if(movie) return res.status(200).json(movie) 
                return res.status(403).json({ message: 'Cant find movie with this name' })
            }
        }

        return res.status(401).json({ message: 'Unauthorised' });
    
    }catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }
}



async function addMovie(req, res, next){
    
    try{

        if (req.user.role !== 'Admin') {
            
            return res.status(403).send({ message : 'Unauthorized access to Add a movie'});
        }

        if(!req.body.name || req.body.name == null ) return res.status(403).send({ message: 'Invalid request payload'});
        
        let movie = await movieService.getMovieByName(req.body.name);
        
        if(movie){
            
            return res.status(409).send({ message: 'Movie already exists with this name'});
        }

        let newMovie = await movieService.addMovie(req.body);

        return res.status(201).json({ message: 'Movie created successfully' });
    
    } catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }
    
}

async function updateMovie(req, res, next){
    try{
        
        if(req.body['99popularity']){
            let popularity = req.body['99popularity'];
            delete req.body['99popularity'];
            req.body.popularity = popularity;
        }

        if(req.user.role === 'Admin'){
            let movie = await movieService.getMovieByName(req.params.moviename);
            if(movie){ 

                let updated = await movieService.updateMovie(req.params.moviename, req.body);

                if(updated) return res.status(200).json({message : 'Movie successfully updated'});
            }
            return res.status(204).send('Movie not found with this name')
        }

        let role = await roleService.findRole(req.user.role);

        if(role.permissions.moviesUpdateAccess){
            
            let user = await userService.getUserByUsername(req.user.username);
            
            if (user.resource.movies.includes(req.params.moviename)){
                
                let movie = await movieService.getMovieByName(req.params.moviename);
                if(movie){ 

                    let updated = await movieService.updateMovie(req.params.moviename, req.body);

                    if(updated) return res.status(200).json({message : 'Movie successfully updated'});
                }
                return res.status(204).send('Movie not found with this name')
            }
           
        }
        
        return res.status(401).json({ message: 'Unauthorised' });
    
    }catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }
}


async function deleteMovieByName(req, res, next){


    try{
        if (req.user.role === 'Admin')
        {
            let result = await movieService.deleteMovieByName(req.params.moviename)
            if(result.ok) return res.status(200).json({message: 'Movie deleted succesfully'}) 
            return res.status(403).json({ message: 'Cant find movie with this name' })
               
        }
        
        let role = await roleService.findRole(req.user.role)
        
        if(role.permissions.moviesDeleteAccess)
        {
            let user = await userService.getUserByUsername(req.user.username)
            if (user.resource.movies.includes(req.params.moviename))
            {
                let result = await movieService.deleteMovieByName(req.params.moviename)
                if(result.ok) return res.status(200).json({message: 'Movie deleted succesfully'}) 
                return res.status(403).json({ message: 'Cant find movie with this name' })
            }
        }

        return res.status(401).json({ message: 'Unauthorised' });
    
    }catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }

} 

async function fetchAllMovies(req, res, next){
    try{
        if (req.user.role === 'Admin')
        {
        
            let movie = await movieService.getAllMovies()
            if(movie) return res.status(200).json(movie) 
            return res.status(403).json({ message: 'Cant find movies' })
               
        }
        
        return res.status(401).json({ message: 'Unauthorised' });
    
    }catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }    
}



