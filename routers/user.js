const express = require('express')
const router = express.Router()

const model = require('../models/index')

router.get('/', (req, res, next) => {
    model.User.findAll()
        .then(
            companies => {
                res.status(200).json(companies)
            })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });
});

module.exports = router
