const express = require('express');
const router = express.Router();
const userService = require('./../services/users.service');
const authorize = require('./../../_helper/authorize.js')

router.post('/authenticate', authenticate);     // public route

module.exports = router;

function authenticate(req, res, next) {
    
    userService.authenticateUser(req.body)
        .then(user => user ? res.json(user) : res.status(401).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));

}
