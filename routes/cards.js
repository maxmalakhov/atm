var express = require('express');
var router = express.Router();

var controller  = require('../controllers/card-controller');

// enter
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

// details
router.get('/:number', function(req, res) {
    var number = req.params.number;

    if(!controller.checkNumber(number)) {
        res.send({
            result: false,
            attr: 'number',
            error: "Card doesn't exist!"
        });
        return;
    }
    var card = controller.getCard(number);

    res.send({
        result: true,
        card: card
    });
});

// withdraw
router.post('/:number', function(req, res) {
    var number = req.params.number;
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
