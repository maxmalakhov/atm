/**
 * Created by max on 1/21/16.
 */
var app = require("../app");
var should = require('should');
var assert = require('assert');
var request = require('supertest').agent(app.listen());
var superagent = require('superagent');

describe("Entry View", function() {
    it("should render Entry page", function(done) {
        request.get("/")
            .expect(200)
            .end(done);
    });

    it('should reject card number', function(done) {

        request.post('/api/card')
            .type('form')
            .send({number:"1111",code:"1234"})
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

    it('should reject pin code', function(done) {

        request.post('/api/card')
            .type('form')
            .send({number:"1234",code:"1111"})
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.ok(res);
                assert.ok(res.body);
                assert.equal(res.status, 200);

                res.body.should.have.property('result').and.equal(false);
                res.body.should.have.property('error').and.equal("Code doesn't match!");
                done();
            });
    });

    it('should accept card credentials', function(done) {

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

});