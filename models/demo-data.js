/**
 * Created by max on 1/20/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var cards = [
    { number: '1234', code: '1234', holder: 'Eddie Redmayne',     balance: 10000 },
    { number: '2345', code: '2345', holder: 'Michael Fassbender', balance: 100   },
    { number: '3456', code: '3456', holder: 'Leonardo DiCaprio',  balance: -10   },
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
            console.log("Creating table 'card'");

            var query = client.query("create table card(id serial, number varchar(20), code varchar(4), holder varchar(20), balance numeric)");

            query.on('end', function(){
                done();
                console.log("Created!");
                console.log("Filling it with cards");
            });

            cards.map(function(card) {

                var query = client.query("insert into card(number, code, holder, balance)"+
                                         "values('"+card.number + "', '" + card.code + "', '" + card.holder  + "', " + card.balance+ ")");

                query.on('end', function(){
                    done();
                    console.log("Filling it with cards");
                });
            });
        });
    }
};

module.exports = new demo_data();
