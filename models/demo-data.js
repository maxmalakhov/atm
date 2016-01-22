/**
 * Created by max on 1/20/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var cards = [
    { number: '1234', code: '1234', holder: 'Eddie Redmayne',     balance: 10000 },
    { number: '2345', code: '2345', holder: 'Michael Fassbender', balance: 100   },
    { number: '3456', code: '3456', holder: 'Leonardo DiCaprio',  balance: -10   }
]

var demo_data =  function() {};

demo_data.prototype = {
    'cleanup': function() {

        pg.connect(connectionString, function(err, client, done) {
            console.log("Drop table 'card'")

            var query = client.query("drop table if exists card");

            query.on('end', function() {
                console.log("Dropped!");
                done();
            });
        });
    },

    'populate': function() {

        pg.connect(connectionString, function(err, client, done) {
            console.log("populate demo data");

            function fillData() {
                cards.map(function(card) {
                    var fill_data = client.query("insert into card(number, code, holder, balance)"+
                    "values('"+card.number + "', '" + card.code + "', '" + card.holder  + "', " + card.balance+ ")");

                    fill_data.on('end', function(){
                        done();
                        console.log("Filling it with data");
                    });
                });
            }

            function checkEmpty() {
                var empty = true;
                var table_empty = client.query("select * from card");
                table_empty.on('row', function(row) {
                    empty = false;
                });
                table_empty.on('end', function(){
                    done();
                    console.log("Check if empty!");
                    if(empty) {
                        // #4. fill data
                        fillData();
                    } else {
                        done();
                    }
                });
            }

            function createTable() {
                var create_table = client.query("create table card(id serial, number varchar(20), code varchar(4), holder varchar(20), balance numeric)");
                create_table.on('end', function() {
                    console.log("Created!");
                    // #3. check for empty
                    checkEmpty();
                });
            }

            // #1. check for existing
            var exists = false;
            var query = client.query("select exists( select * from information_schema.tables where table_name = 'card')");
            query.on('row', function(row) {
                exists = row.exists;
            });
            query.on('end', function() {
                console.log("Check Table!");
                if (!exists) {
                    // #2. create if not existing
                    createTable();
                } else {
                    // #3. check for empty
                    checkEmpty();
                }
            });
        });
    }
};

module.exports = new demo_data();
