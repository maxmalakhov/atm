/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'backbone',
    'app/views/entry'
], function($, BB, EntryView){

    return BB.Router.extend({
        routes: {
            ""                  : "entry"
        },

        initialize: function () {
        },

        navigate: function (view, params) {
            switch(view) {
                case 'enter': this.entry(); return;
                case 'card': this.card(params); return;
            }

        },

        entry: function() {
            if (!this.entryView) {
                this.entryView = new EntryView();
            }
            this.entryView.render(this);
        },

        card: function(params) {
            if (!this.cardView) {
                this.cardView = new CardView();
            }
            this.cardView.render(this, params);
        }
    });
});