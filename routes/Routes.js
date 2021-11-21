'use strict';

var express = require('express');

module.exports = (app) => {
    var gameDataController = require('../controllers/GameDataController');

    var apiRoutes = express.Router();

    app.get('/', (req, res) => {
        res.send('We are happy to see you using Chat Bot Webhook');
    });

    app.post('/', gameDataController.processRequest);
};