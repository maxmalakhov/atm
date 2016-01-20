/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'validation',
    'text!tpl/WithdrawView.html',
    'app/models/Withdraw'
],
function($, _, BB, validation, tpl, Withdraw) {

    function displayError(self, attr, error) {
        self.$el.find('div.'+attr).removeClass('has-success');
        self.$el.find('div.'+attr).addClass('has-error');
        self.$el.find('div.'+attr+' label').html(error);
    }

    function removeErrors(self) {
        self.$el.find('div.amount label').html('');
        self.$el.find('div.amount').removeClass('has-error');
    }

    return BB.View.extend({

        template: _.template(tpl),

        el: $('#content'),

        events: {
            //'keyup input#amount': 'amount',
            'click button#withdraw': 'submit',
            'click button#cancel': 'cancel'
        },

        initialize: function () {
            this.model = new Withdraw();

            // enable validation
            var self = this;
            validation.bind(this, {
                valid: function(view, attr) {
                    self.$el.find('div.'+attr).addClass('has-success');
                },
                invalid: function(view, attr, error) {
                    displayError(self, attr, error);
                }
            });
        },

        render: function (app, options) {
            this.app = app;
            // set card number
            this.model.set({'number': options.number});

            $(this.el).html(this.template());

            return this;
        },

        submit: function(event) {
            event.preventDefault();

            removeErrors(this);

            var model = this.model;
            var amount = this.$el.find('input[name=amount]').val();
            model.set('amount', amount);

            model.validate();

            if(model.isValid()) {
                var self = this;
                model.save().done(
                    function(data) {
                        if(data.result) {
                            self.app.navigate('card', { number: model.get('number') });
                        } else {
                            if(data.attr) {
                                displayError(self, data.attr, data.error);
                            } else {
                                console.debug(data.error);
                            }
                        }
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }

            return false;
        },

        cancel: function(event) {
            event.preventDefault();

            this.app.navigate('card', { number: this.model.get('number') });

            return false;
        }
    });
});