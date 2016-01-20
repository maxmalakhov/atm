/**
 * Created by max on 1/10/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var database =  function() {};

database.prototype  = {

    'get' : function(number, handler) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                handler(err);
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
                handler(results);
            });
        });
    },

    'update' : function(fund, handler) {

        pg.connect(connectionString, function(err, client, done) {
            var result = false;

            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                handler(result);
                return { success: false, data: err};
            }

            var result = client.query("update card set values fund = $1", [fund]);

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                handler(result);
                return  { success: true, data: result};
            });
        });
    }
}

module.exports = new database();