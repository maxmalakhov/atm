/**
 * Created by max on 1/21/16.
 */
var webpack = require('webpack');

module.exports = {
    // Entry point for static analyzer
    context: __dirname + "/app",

    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8081',
            'webpack/hot/dev-server',
            'public/js/main.js'
        ]
    },

    output: {
        // Where to build results
        path: __dirname + '/assets',

        // Filename to use in HTML
        filename: 'bundle.js',

        // Path to use in HTML
        publicPath: '/assets/'
    },

    resolve: {
        // Absolute path that contains modules
        root: __dirname,

        // Directory names to be searched for modules
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

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        preLoaders: [
        ],
        loaders: [
            {test: /\.css$/, loaders: ['style', 'css', 'autoprefixer']},
            {test: /\.json$/, loaders: ['json']},
            {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
            {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'}
        ]
    },

    devtool: '#inline-source-map',

    eslint: {
        emitErrors: true,
        reporter: function(results) {
            return results.map(function(result) {
                return result.messages.map(function(msg) {
                    return (
                    ' ' + msg.message + '(' + msg.ruleId + ')' +
                    ' @ line ' + msg.line + ' column ' + msg.column +
                    ' - ' +
                    (msg.fatal ? 'fatal, ' : '') +
                    'severity: ' + msg.severity
                    );
                }).join('\n');
            }).join('\n');
        }
    }
};