/**
 * Created by max on 1/10/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var database =  function() {};

database.prototype  = {

    'get' : function(number, handler, options) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                handler(err, options);
                return;
            }

            var results = [];

            var query = client.query("select * from card where number = $1", [number]);
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                done();
                handler(results, options);
            });
        });
    },

    'update' : function(number, balance) {

        pg.connect(connectionString, function(err, client, done) {
            var result = false;

            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return;
            }

            var result = client.query("update card set balance = $2 where number = $1", [number, balance]);
        });
    }
}

module.exports = new database();