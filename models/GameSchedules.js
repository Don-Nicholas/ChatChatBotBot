const mongoose = require('mongoose');

const GameScheduleSchema =mongoose.Schema({
    score: {
        type: String, 
        required: false,
    },
    isWinner: {
        type: Boolean,
        required: false,
    },
    hasBeenPlayed: {
        type: Boolean,
        required: false,
    },
    opponent: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    }
});

module.exports = mongoose.model('GameSchedule', GameScheduleSchema);