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
            ""                  : "entry",
            "card"              : "card",
            "card/:id/deposit"  : "deposit"
        },

        initialize: function () {
        },

        entry: function() {
            if (!this.entryView) {
                this.entryView = new EntryView();
            }
            this.entryView.render();
        }
    });
});