const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const errorHandler = require('./_helper/error-handler');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/api', function (req, res) {
    res.status(200).send('API works.');
});


var UserController = require('./app/controllers/users.controller.js');
app.use('/user', UserController);


var MovieController = require('./app/controllers/movies.controller.js');
app.use('/movie', MovieController);

var RoleController = require('./app/controllers/roles.controller.js');
app.use('/policy', RoleController);


app.use(errorHandler);


const server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});