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

        function updateForm(self, model) {
            self.$el.find('input[name=holder]').val(model.get('holder'));
            self.$el.find('input[name=balance]').val(model.get('balance'));
        }

        return BB.View.extend({

            template: _.template(tpl),

            el: $('#content'),

            events: {
                'click button#gotoWithdraw': 'gotoWithdraw',
                'click button#exit': 'exit'
            },

            initialize: function () {
                this.model = new Card();

                // update form
                var self = this;
                this.model.bind("change", function() {
                    updateForm(self, this);
                });
            },

            render: function (app) {
                this.app = app;

                $(this.el).html(this.template());

                this.model.fetch();
                updateForm(this, this.model);

                return this;
            },

            gotoWithdraw: function() {
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