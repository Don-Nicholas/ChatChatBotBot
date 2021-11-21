const router = require('express').Router();
const GameSchedule = require('../models/GameSchedules');

router.get('/', async (req, res) => {
    try {
        const gameSchedule = await GameSchedule.find();
        res.json(gameSchedule);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
    // res.sendFile(__dirname+"/index.html");
});

router.get('/:gameScheduleID', async (req, res) => {
    try {
        const gameSchedule = await GameSchedule.findById(req.params.gameScheduleID);
        res.json(gameSchedule);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});


router.post('/', async (req, res) => {
    const gameSchedule = new GameSchedule({
        score: req.body.score,
        isWinner: req.body.isWinner,
        hasBeenPlayed: req.body.hasBeenPlayed,
        opponent: req.body.opponent,
        date: req.body.date
    });

    try {
        const savedGameSchedule = await gameSchedule.save();
        res.json(savedGameSchedule);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

router.delete('/:gameScheduleID', async (req, res) => {
    try {
        const removeGameSchedule = await GameSchedule.remove({
            _id: req.params.gameScheduleID
        });
        res.json(removeGameSchedule);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

router.patch('/:gameScheduleID', async (req, res) => {
    try {
        const updatedGameSchedule = await GameSchedule.updateOne(
            {
                _id: req.params.gameScheduleID,
            },
            {
                $set: 
                {
                    score: req.body.score
                }
            }
        );

        res.json(updatedGameSchedule);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;