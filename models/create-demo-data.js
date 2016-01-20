/**
 * Created by max on 1/20/16.
 */
var args = require(__dirname + '/../test/cli');
var pg = require(__dirname + '/../lib');

var cards = [
    { number: '1234', code: '1234', holder: 'Eddie Redmayne',     fund: 10000 },
    { number: '2345', code: '2345', holder: 'Michael Fassbender', fund: 100   },
    { number: '3456', code: '3456', holder: 'Leonardo DiCaprio',  fund: -10   },
]

var con = new pg.Client({
    host: args.host,
    port: args.port,
    user: args.user,
    password: args.password,
    database: args.database
});
con.connect();
if(args.down) {
    console.log("Dropping table 'card'")
    var query = con.query("drop table if exists card");
    query.on('end', function() {
        console.log("Dropped!");
        con.end();
    });
} else {
    console.log("Creating table 'card'");
    con.query("create table card(id serial, number varchar(20), code varchar(4)), cardholder varchar(20), fund: numeric").on('end', function(){
        console.log("Created!");
        console.log("Filling it with people");
    });;
    cards.map(function(card) {
        return con.query("insert into card(number, code, cardholder, fund) "+
                         "values('"+card.number + "', '" + card.code + "', '" + card.holder  + "', " + card.fund+ ")");
    }).pop().on('end', function(){
        console.log("Inserted 3 cards");
        con.end();
    });
}