const mongoose = require('mongoose');

const TeamInfoSchema =mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('TeamInfo', TeamInfoSchema);