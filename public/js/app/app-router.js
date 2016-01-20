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
            "card/:id"          : "card",
            "card/:id/deposit"  : "deposit"
        },

        initialize: function () {
        },

        navigate: function (url) {
            window.location = url;
        },

        entry: function() {
            if (!this.entryView) {
                this.entryView = new EntryView();
            }
            this.entryView.render(this);
        }
    });
});