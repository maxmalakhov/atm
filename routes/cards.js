var express = require('express');
var router = express.Router();

var controller  = require('../controllers/card-controller');

// enter
router.post('/', function(req, res) {
    var number = req.param('number');
    var code = req.param('code');

    controller.checkCard(number, function(card) {
        if(!card) {
            res.send({
                result: false,
                attr: 'number',
                error: "Card doesn't exist!"
            });
            return;
        }

        if(card.code !== code) {
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
});

// details
router.get('/:number', function(req, res) {
    var number = req.params.number;

    controller.getCard(number, function(card) {
        if(!card) {
            res.send({
                result: false,
                attr: 'number',
                error: "Card doesn't exist!"
            });
            return;
        }

        // succeed
        delete card.code;
        res.send(card);
    });
});

function parse(text) {
    try {
        return parseInt(text);
    } catch(err) {
        console.error(err);
    }
    return 0;
}

// withdraw
router.post('/:number', function(req, res) {
    var number = req.params.number;
    var amount = req.param('amount');

    controller.updateBalance(number, amount, function(card, amount, handler) {
        if(!card) {
            res.send({
                result: false,
                attr: 'number',
                error: "Card doesn't exist!"
            });
            return;
        }

        var balance = parse(card.balance);
        var amount = parse(amount);
        if(balance < amount) {
            res.send({
                result: false,
                attr: 'amount',
                error: "Doesn't enough funds!"
            });
            return;
        }

        handler(number, balance - amount);

        // succeed
        res.send({
            result: true,
            number: number
        });
    });

});


module.exports = router;
