/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Integration Tesing Script 
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

var server = 'http://127.0.0.1:3000';
var expect = chai.expect;
var assert = chai.assert;

function testAsync(done, fn) {
    try {
        fn();
        done();
    }
    catch(err) {
        done(err);
    }
}

describe('Test Mini Stock Exchange REST API', function() {
    it('should return correct company', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'US', Category: 'Finance', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Response = C2', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error message when all query values are not provided', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: '', Category: '', BaseBid: ''})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Provide values for BaseBid, Category and CountryCode', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error message when all CountryCode query value is not provided', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: '', Category: 'Finance', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Provide value for CountryCode', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error message when all Category query value is not provided', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'US', Category: '', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Provide value for Category', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error message when all BaseBid query value is not provided', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'US', Category: 'Finance', BaseBid: ''})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Provide value for BaseBid', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return message when CountryCode is not available', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'CA', Category: 'Finance', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Country, CA does not exist', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return message when Category is not available', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'US', Category: 'Production', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Category, Production does not exist', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return message when CountryCode and Category is not available', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'CA', Category: 'Production', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal('Country, CA and Category, Production does not exist', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error response for wrong queries', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'CA', Category: 'Production'})
        .end((err, res) => {
            testAsync(done, function(){
                expect(res).to.have.status(500);
                done();
            }.bind(res));
        });
    });
});