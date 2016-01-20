/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'backbone'
],
function($, BB) {
    return BB.Model.extend({

        url: function() {
            return 'api/card/' + this.get('number');
        },

        defaults: {
            number: '1234',
            amount: ''
        },

        validation: {
            amount: {
                required: true,
                rangeLength: [1, 20],
                pattern: 'digits'
            }
        }
    });
});