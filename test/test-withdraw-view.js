/**
 * Created by max on 1/21/16.
 */
var app = require("../app");
var should = require('should');
var assert = require('assert');
var request = require('supertest').agent(app.listen());
var superagent = require('superagent');

describe("Withdraw View", function() {
    // navigate to Card View
    beforeEach(function(done) {
        request.post('/api/card')
            .type('form')
            .send({number:"1234",code:"1234"})
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('result').and.equal(true);
                done();
            });
    });

    it('should reject withdrawal amount', function(done) {

        request.post('/api/card/1234')
            .type('form')
            .send({number:"1234",amount:"12341234"})
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('result').and.equal(false);
                res.body.should.have.property('error').and.equal("Doesn\'t enough funds!");
                done();
            });
    });
});


describe("Withdraw View. Update Balance", function() {
    var balance = 0;
    var amount = 2;

    // #1. get balance
    before(function(done) {
        request.get('/api/card/1234')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('number').and.equal('1234');
                res.body.should.have.property('balance');

                balance = res.body.should.have.property('balance').obj;
                done();
            });
    });

    it('should withdraw amount', function(done) {
        // #2. update balance
        request.post('/api/card/1234')
            .type('form')
            .send({number:"1234", amount: amount})
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('result').and.equal(true);
                done();
            });
    });

    // #3. check balance
    after(function(done) {
        request.get('/api/card/1234')
            .type('form')
            .send({number:"1234",code:"1234"})
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('number').and.equal('1234');
                res.body.should.have.property('balance');

                var actual = res.body.should.have.property('balance').obj;

                assert.equal(actual, balance-amount);
                done();
            });
    });
});
