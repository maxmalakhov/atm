/**
 * Created by max on 1/20/16.
 */
var controller = function() {};

controller.prototype = {
    'checkNumber' : function(entry) {
        return true;
    },

    'getCard' : function(number) {
        return true;
    }
};

module.exports = new controller();