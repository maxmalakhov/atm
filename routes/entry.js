var express = require('express');
var router = express.Router();

var controller  = require('../controllers/entry-controller');

router.post('/', function(req, res) {
    var number = req.param('number');
    var code = req.param('code');

    if(!controller.checkNumber(number)) {
        res.send({
            result: false,
            attr: 'number',
            error: "Card doesn't exist!"
        });
        return;
    }
    if(!controller.checkCode(number, code)) {
        res.send({
            result: false,
            attr: 'code',
            error: "Code doesn't match!"
        });
        return;
    }
    // succeed
    res.send({
        result: true,
        number: number
    });

});

module.exports = router;
