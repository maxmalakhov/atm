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

    'checkDeposit' : function(code) {
        return true;
    },

    'updateDeposit' : function(code) {
        return true;
    }
};

module.exports = new controller();