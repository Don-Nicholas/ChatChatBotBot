'use strict';

var express = require('express'),
bodyParser = require('body-parser'),
http = require('http'),
config = require('./config'),
server = express(),
mongoose = require('mongoose'),
TeamInfo = require('./models/TeamInfos'),
GameSchedule = require('./models/GameSchedules');
require('dotenv/config');


mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);


server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

var routes = require('./routes/Routes');

routes(server);

server.listen((process.env.PORT || 8080), () => {
    console.log("Server is up and listening on port" + process.env.PORT);
})
