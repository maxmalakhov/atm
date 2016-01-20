/**
 * Created by max on 1/20/16.
 */
define([
        'jquery',
        'backbone',
        'text!tpl/EntryView.html'
],
function($, BB, tpl) {

    return BB.View.extend({
        el: $('#content'),

        initialize:function () {
            _.bindAll(this, 'render');

            this.render();
        },

        render:function () {
            $(this.el).html(tpl);
            return this;
        }
    });
});