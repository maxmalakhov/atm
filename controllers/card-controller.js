/**
 * Created by max on 1/20/16.
 */
var controller = function() {};

controller.prototype = {
    'checkNumber' : function(entry) {
        return true;
    },

    'checkCode' : function(code) {
        return true;
    },

    'getCard' : function(number) {
        return true;
    },

    'checkDeposit' : function(code) {
        return true;
    },

    'updateDeposit' : function(code) {
        return true;
    }
};

module.exports = new controller();