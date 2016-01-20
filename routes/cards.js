var express = require('express');
var router = express.Router();

var controller  = require('../controllers/card-controller');

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

module.exports = router;
