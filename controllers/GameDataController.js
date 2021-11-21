'use strict';

var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

function getTeamSchedule(req, res) {
    let parameters = req.body.result.parameters;
    if (parameters.team1 == "") {

        let game_occurence = parameters.game_occurence;
        let team = parameters.team;
        if (game_occurence == "previous") {
            //previous game
            GameSchedule.find({ opponent: team }, function (err, games) {
                if (err) {
                    return res.json({
                        speech: 'Something went wrong!',
                        displayText: 'Something went wrong!',
                        source: 'game schedule'
                    });
                }
                if (games) {
                    var requiredGame;
                    for (var i = 0; i < games.length; i++) {
                        var game = games[i];
                        var convertedCurrentDate = new Date();
                        var convertedGameDate = new Date(game.date);
                        // console.log(game.date);
                        // console.log(convertedCurrentDate);
                        // console.log(convertedGameDate > convertedCurrentDate);
                        if (convertedGameDate < convertedCurrentDate) {
                            if (games.length > 1) {
                                requiredGame = games[i - 1];
                                var winningStatement = "";
                                if (requiredGame.isWinner) {
                                    winningStatement = "Kings won this match by " + requiredGame.score;
                                }
                                else {
                                    winningStatement = "Kings lost this match by " + requiredGame.score;
                                }
                                return res.json({
                                    speech: 'Last game between Kings and ' + parameters.team + ' was played on ' + requiredGame.date + ' .' + winningStatement,
                                    displayText: 'Last game between Kings and ' + parameters.team + ' was played on ' + requiredGame.date + ' .' + winningStatement,
                                    source: 'game schedule'
                                });
                                break;
                            }
                            else {
                                return res.json({
                                    speech: 'Cant find any previous game played between Kings and ' + parameters.team,
                                    displayText: 'Cant find any previous game played between Kings and ' + parameters.team,
                                    source: 'game schedule'
                                });
                            }
                        }
                    }
                }
            });
        }
        else {
            return res.json({
                speech: 'Next game schedules will be available soon',
                displayText: 'Next game schedules will be available soon',
                source: 'game schedule'
            });
        }
    }
    else {
        return res.json({
            speech: 'Cant handle the queries with two teams now. I will update myself',
            displayText: 'Cant handle the queries with two teams now. I will update myself',
            source: 'game schedule'
        });
    }
};

// function Sample(req, res) {
//     GameSchedule.find({ opponent: team }, function (err, games) {

//     });   
// };

exports.processRequest = (req, res) => {

    console.log(req.body);
    res.json({
        "fulfillmentText": "Hi po",
        "outputContexts": []
    });
    // if (req.body.result.action == "schedule") {
    //     getTeamSchedule(req, res)
    //     // console.log(req.body.result.action == "schedule");
    // }
    // else if (req.body.result.action == "tell.about") {
    //     getTeamInfo(req, res)
    //     // console.log(req.body.result.action);
    // }
};