const express = require('express');
const router = express.Router();
const roleService = require('./../services/roles.service');
const userService = require('./../services/users.service');
const authorize = require('./../../_helper/authorize');

router.put('/:username', authorize(), modifyPolicy);

module.exports = router;

async function modifyPolicy(req, res, next){
    try{

        if(req.user.role !== 'Admin') {
            return res.status(401).send({message :'unauthorized access to change permissions'});
        }
        
        let user = await userService.getUserByUsername(req.params.username)

        if(user){

            let movieList = user.resource.movies;

            if(req.body.addMovies){
                for(let movie of req.body.addMovies){
                    if(movieList.indexOf(movie) == -1) movieList.push(movie);
                }
            }
            if(req.body.removeMovies){
                for(let movie of req.body.removeMovies){
                    if(movieList.indexOf(movie) > -1) movieList.splice(movieList.indexOf(movie), 1); 
                }
            }

            let userPayload = {
                resource: {
                    movies: movieList
                }
            }
            
            if(req.body.role_name){
                let role = await roleService.findRole(req.body.role_name)
                if(role){
                    userPayload.role_name = req.body.role_name;
                }else return res.status(403).send({ message: 'Invalid Role name'});  

            }

            let result = await userService.modifyPolicy(req.params.username, userPayload);
            if(result) return res.status(200).json({message: 'Policy Updated Successfully'});
            
        
        }else{ 
            return res.status(403).send({ message: 'User does not exist'}); 
        }

        
    
    }catch(err){
        return res.status(500).send({ message: 'Internal Server Error'});
    }
}