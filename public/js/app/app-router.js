/**
 * Created by max on 1/20/16.
 */
define([
    'jquery',
    'backbone',
    'app/views/EntryView',
    'app/views/CardView',
    'app/views/WithdrawView'
], function($, BB, EntryView, CardView, WithdrawView){

    return BB.Router.extend({
        routes: {
            ""                    : "entry"
        },

        initialize: function () {
        },

        navigate: function (view, options) {
            switch(view) {
                case 'entry': this.entry(); return;
                case 'card': this.card(options); return;
                case 'withdraw': this.withdraw(options); return;
                default: this.entry();
            }

        },

        entry: function() {
            if (!this.entryView) {
                this.entryView = new EntryView();
            }
            this.entryView.render(this);
        },

        card: function(options) {
            if (!this.cardView) {
                this.cardView = new CardView();
            }
            this.cardView.render(this, options);
        },

        withdraw: function(options) {
            if (!this.withdrawView) {
                this.withdrawView = new WithdrawView();
            }
            this.withdrawView.render(this, options);
        }
    });
});