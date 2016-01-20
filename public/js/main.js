/**
 * Created by max on 1/20/16.
 */
// Require.js allows us to configure shortcut alias
require.config({
    paths: {
        // Major libraries
        jquery: 'lib/jquery-min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        app: 'js/app',
        text: 'lib/text',
        tpl: 'tpl'
    }
});

require([
    'jquery',
    'backbone',
    'app/app-router',
], function($, BB, AppRouter){

    app = new AppRouter();
    BB.history.start();
});
