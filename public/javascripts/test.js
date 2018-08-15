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

describe('Test REST api', function() {
    it('should return correct company', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/trade')
        .query({CountryCode: 'US', Category: 'Finance', BaseBid: '10'})
        .end((err, res) => {
            testAsync(done, function(){
                //console.log('Resp 1: '+JSON.stringify(res));
                expect(res).to.have.status(200);
                assert.equal('Response = C2', res.body.message);
                done();
            }.bind(res));
        });
    });

    it('should return error response code when division on zero', (done) => {
        this.timeout(15000);

        chai.request(server)
        .get('/api/divide')
        .query({number: 10, divider: 0})
        .end((err, res) => {
            //console.log('Resp 2: '+JSON.stringify(res));
            testAsync(done, function(){
                expect(res).to.have.status(500);
                done();
            }.bind(res));
        });
    });

    it('always failing test, assert incorrect result', (done) => {
        this.timeout(15000);
        
        chai.request(server)
        .get('/api/divide')
        .query({number: 10, divider: 2})
        .end((err, res) => {
            //console.log('Resp 3: '+JSON.stringify(res));
            testAsync(done, function(){
                expect(res).to.have.status(200);
                assert.equal(6, res.text);
                done();
            }.bind(res));
        });
    });
});