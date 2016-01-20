/**
 * Created by max on 1/20/16.
 */
define([
        'jquery',
        'underscore',
        'backbone',
        'text!tpl/CardView.html',
        'app/models/Card'
    ],
    function($, _, BB, tpl, Card) {

        return BB.View.extend({

            template: _.template(tpl),

            el: $('#content'),

            events: {
                'click button#withdraw': 'withdraw',
                'click button#exit': 'exit'
            },

            initialize: function () {
                this.model = new Card();
            },

            render: function (app) {
                this.app = app;
                $(this.el).html(this.template());

                this.model.fetch();

                $(this.el).find('input[name=cardholder]').val(this.model.get('cardholder'));
                $(this.el).find('input[name=balance]').val(this.model.get('balance'));

                return this;
            },

            withdraw: function() {
                event.preventDefault();

                this.app.navigate('withdraw', { number: this.model.get('number') });

                return false;
            },

            exit: function(event) {
                event.preventDefault();

                this.app.navigate('entry');

                return false;
            }
        });
    });