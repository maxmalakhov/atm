/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'validation',
    'keyboard',
    'text!tpl/EntryView.html',
    'app/models/entry'
],
function($, _, BB, validation, keyboard, tpl, Entry) {

    return BB.View.extend({

        template: _.template(tpl),

        el: $('#content'),

        events: {
            'click button#enter': 'submit'
        },

        initialize: function () {
            this.model = new Entry();
        },

        render: function (app) {
            this.app = app;
            $(this.el).html(this.template());
            // enable keyboard
            $(this.el).find('input[name=code]').keyboard({
                lockInput: true,
                layout: 'custom',
                customLayout: {
                    'normal': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        '{accept}'
                    ],
                    'shift': [ '{bksp}','{accept}']
                }
            });
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

            this.$el.find('div.code label').html('');
            this.$el.find('div.number label').html('');
            this.$el.find('div.code').removeClass('has-error');
            this.$el.find('div.number').removeClass('has-error');

            var number = this.cleanup(this.$el.find('input[name=number]').val());
            this.$el.find('input[name=number]').val(number);

            var code = this.$el.find('input[name=code]').val();

            model.set('number', number);
            model.set('code', code);
            model.validate();

            if(model.isValid()) {
                var self = this;
                model.save().done(
                    function(data) {
                        if(data.result) {
                            self.app.navigate('card', number);
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

        cleanup: function(number) {
            return number.replace(/-/g,'').replace(/\s/g,'');
        }
    });
});