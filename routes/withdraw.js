var express = require('express');
var router = express.Router();

var controller  = require('../controllers/withdraw-controller');

router.post('/', function(req, res) {
    var number = req.param('number');
    var amount = req.param('amount');

    if(!controller.checkNumber(number)) {
        res.send({
            result: false,
            attr: 'number',
            error: "Card doesn't exist!"
        });
        return;
    }
    if(!controller.checkDeposit(amount)) {
        res.send({
            result: false,
            attr: 'amount',
            error: "Doesn't enough funds!"
        });
        return;
    }

    var result = controller.updateDeposit(amount);

    // succeed
    res.send({
        result: result,
        number: number
    });

});

module.exports = router;
