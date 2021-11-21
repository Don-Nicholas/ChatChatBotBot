const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.params);
});

module.exports = router;