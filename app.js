require('express-group-routes');
const express = require('express');
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const models = require('./models');

const home = require('./routers/home')
const user = require('./routers/user')

var sequelize = models.sequelize;
var Sequelize = models.Sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database successful.');
    })
    .catch(err => {
        console.error('Unable to connect to database:', err);
    });

app.use(morgan('dev'));
app.disable('etag');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(home);

app.group('/api/v1', (router) => {
    router.use('/users', user);

});



module.exports = app