var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/:number', function(req, res) {
    var number = req.param.number;

    res.send({
        result: true,
        message: number
    });
});

router.get('/:number', function(req, res) {
    var number = req.params.number;

    res.send({
        result: true,
        message: number
    });
});

module.exports = router;
