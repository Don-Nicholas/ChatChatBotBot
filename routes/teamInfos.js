const router = require('express').Router();
const TeamInfo = require('../models/TeamInfos');

router.get('/', async (req, res) => {
    try {
        const teamInfo = await TeamInfo.find();
        res.json(teamInfo);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
    // res.sendFile(__dirname+"/index.html");
});

router.get('/:teamInfoID', async (req, res) => {
    try {
        const teamInfo = await TeamInfo.findById(req.params.teamInfoID);
        res.json(teamInfo);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});


router.post('/', async (req, res) => {
    const teamInfo = new TeamInfo({
        description: req.body.description,
        name: req.body.name
    });

    try {
        const savedTeamInfo = await teamInfo.save();
        res.json(savedTeamInfo);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

router.delete('/:teamInfoID', async (req, res) => {
    try {
        const removeTeamInfo = await TeamInfo.remove({
            _id: req.params.name
        });
        res.json(removeTeamInfo);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

router.patch('/:teamInfoID', async (req, res) => {
    try {
        const updatedTeamInfo = await TeamInfo.updateOne(
            {
                _id: req.params.teamInfoID,
            },
            {
                $set: 
                {
                    name: req.body.name
                }
            }
        );

        res.json(updatedTeamInfo);
    }
    catch(err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;