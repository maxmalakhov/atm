/**
 * Created by max on 1/20/16.
 */
var databases  = require('../models/database');

var controller = function() {};

controller.prototype = {
    'checkCard' : function(number, handler) {
        databases.get(number, function (cards) {
            // check first element
            handler(cards[0])
        });
    },

    'getCard' : function(number, handler) {
        databases.get(number, function (cards) {
            // get first element
            handler(cards[0])
        });
    },

    'updateBalance' : function(number, amount, handler) {
        databases.get(number, function (cards, amount) {
            // get first element
            handler(cards[0], amount, function(number, amount) {
                databases.update(number, amount)
            })
        }, amount);
    }
};

module.exports = new controller();