/**
 * Created by max on 1/21/16.
 */
var app = require("../app");
var should = require('should');
var assert = require('assert');
var request = require('supertest').agent(app.listen());
var superagent = require('superagent');

describe("Card View", function() {
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

    it('should reject card number', function(done) {

        request.get('/api/card/1111')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('result').and.equal(false);
                res.body.should.have.property('error').and.equal("Card doesn't exist!");
                done();
            });
    });

    it('should display card details', function(done) {

        request.get('/api/card/1234')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('number').and.equal('1234');
                res.body.should.have.property('holder').and.equal("Eddie Redmayne");
                res.body.should.have.property('balance');
                done();
            });
    });
});