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
                this.model.fetch();
                // update form
                var self = this;
                this.model.bind("change", function() {
                    self.$el.find('input[name=holder]').val(this.get('holder'));
                    self.$el.find('input[name=balance]').val(this.get('balance'));
                });
            },

            render: function (app) {
                this.app = app;

                $(this.el).html(this.template());

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