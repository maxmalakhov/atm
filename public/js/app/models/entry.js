/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'backbone'
],
function($, BB) {
    return BB.Model.extend({

        url: 'enter',

        defaults: {
            number: '',
            code: ''
        },

        validation: {
            number: {
                required: true,
                rangeLength: [4, 20],
                pattern: 'digits'
            },

            code: {
                required: true,
                length: 4,
                pattern: 'digits'
            }
        }
    });
});