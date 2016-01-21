/**
 * Created by max on 1/21/16.
 */
var webpack = require('webpack');

module.exports = {
    // Entry point for static analyzer
    context: __dirname + "/app",

    entry: {
        app: [
            //'webpack/hot/dev-server',
            'public/js/main.js'
        ]
    },

    output: {
        path: __dirname + "/public/js",
        filename: 'bundle.js'
    },

    resolve: {
        root: __dirname,
        modulesDirectories: ['js', 'views', 'node_modules'],

        // Replace modules with other modules or paths for compatibility or convenience
        alias: {
            'jquery': __dirname + '/public/lib/jquery-min',
            'underscore': __dirname + '/public/lib/underscore-min',
            'backbone': __dirname + '/public/lib/backbone-min',
            'text': __dirname + '/npm_modules/requirejs-text/text',
            'validation': __dirname +'/public/lib/backbone-validation-amd-min',
            'keyboard': __dirname + '/public/lib/jquery.keyboard.min',
            'tpl': __dirname + '/public/tpl'
        }
    },

    module: {
        preLoaders: [
        ],
        loaders: [
            {test: /\.css$/, loaders: ['style', 'css', 'autoprefixer']},
            {test: /\.json$/, loaders: ['json']},
            {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
            {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'}
        ]
    }
};