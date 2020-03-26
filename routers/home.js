const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../middleware/auth')

const model = require('../models/index')

router.post('/login', (req, res, next) => {
    
    var userRequest = {
        id : req.body.id,
        name : req.body.username,
        email : req.body.email
    };

    console.log(userRequest);
    const user = {
        id: 1 , 
        username : 'saputra' , 
        email: 'saputra@gmail.com'
    };
    
    jwt.sign({user : userRequest} , 'secretkey', (error , token) => {
        res.json({
            token
        });
    });
});

router.post('/transactions' , auth , (req , res , next) => {
    jwt.verify(req.token, 'secretkey' , (error , authData) => {
        if(error)
            res.sendStatus(403);
        else
            res.json({
                message: 'Successfully to create transaction',
                authData
            })
    });
});

module.exports = router
