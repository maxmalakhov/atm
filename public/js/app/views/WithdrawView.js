/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'validation',
    'keyboard',
    'text!tpl/WithdrawView.html',
    'app/models/Withdraw'
],
function($, _, BB, validation, keyboard, tpl, Withdraw) {

    return BB.View.extend({

        template: _.template(tpl),

        el: $('#content'),

        events: {
            'click button#withdraw': 'submit',
            'click button#exit': 'exit'
        },

        initialize: function () {
            this.model = new Withdraw();
        },

        render: function (app, options) {
            this.app = app;
            $(this.el).html(this.template());
            // set card number
            //this.model.set({'number': options.number});
            // enable validation
            var self = this;
            validation.bind(this, {
                valid: function(view, attr) {
                    self.$el.find('div.'+attr).addClass('has-success');
                },
                invalid: function(view, attr, error) {
                    self.$el.find('div.'+attr).removeClass('has-success');
                    self.$el.find('div.'+attr).addClass('has-error');
                    self.$el.find('div.'+attr+' label').html(error);
                }
            });
            return this;
        },

        submit: function(event) {
            event.preventDefault();

            var model = this.model;

            // remove errors
            this.$el.find('div.amount label').html('');
            this.$el.find('div.amount').removeClass('has-error');

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
                            console.debug(data.message);
                        }
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }

            return false;
        },

        exit: function(event) {
            event.preventDefault();

            this.app.navigate('card', { number: this.model.get('number') });

            return false;
        }
    });
});