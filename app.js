const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postsRoute = require('./routes/posts');
const homeRoute = require('./routes/home');
const teamInfo = require('./routes/teamInfos');
const gameSchedule = require('./routes/gameSchedules');


// const sampleRoute = require('./routes/sample');
const bodyParser = require('body-parser');
require('dotenv/config');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', homeRoute);
app.use('/posts', postsRoute);
app.use('/teamInfo', teamInfo);
app.use('/gameSchedule', gameSchedule);
// app.use('/sample', sampleRoute);

mongoose.connect('mongodb+srv://admin:adminadmin@sampsamp.cgzay.mongodb.net/Databes',
() => {
    console.log("Connected to DB!");
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Listening to port "+port);
});