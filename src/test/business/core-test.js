require('dotenv').config({ path: '.env' });

import assert from 'assert';
import chai from 'chai';
import MyDb from '../../modules/db/mydb';
import Core from '../../modules/business/core';

let expect = chai.expect;



    describe('Test Mini Stock Exchange Components', () => {
        let res;

        before('getting db connection object', (done) => {
            let db = new MyDb();
        
            db.init()
            .then((cn) => {
                return cn;
            })
            .then((conn) => {
                let cre = new Core(conn);
        
                cre.getBestCompany(40, 'US', 'Automobile')
                .then((result) => {
                    res = result;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        });

        it('should return message that no companies passed from targeting', (done) => {
            expect(res).to.equal('No Companies Passed from Targeting');
            done();
        }).timeout(15000);
    });
