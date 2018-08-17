/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Component Testing Module
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 15th August 2018
 * */

require('dotenv').config({ path: '.env' });

import assert from 'assert';
import chai from 'chai';
import MyDb from '../../modules/db/mydb';
import Core from '../../modules/business/core';

let expect = chai.expect;

describe('Test Mini Stock Exchange Components', () => {
    let cre;

    before('getting db connection object', (done) => {
        let db = new MyDb();
        
        db.init()
        .then((cn) => {
            return cn;
        })
        .then((conn) => {
            cre = new Core(conn);
            done();
        })
        .catch((err) => {
            console.log(err);
        });
    });

    it('should return no companies passed from budget', () => {
        return cre.getBestCompany(20, 'IN', 'Finance')
        .then((result) => {
            assert.deepEqual(result, 'No Companies Passed from Budget');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);

    it('should return country does not exist', () => {
        return cre.getBestCompany(40, 'SP', 'IT')
        .then((result) => {
            assert.deepEqual(result, 'Country, SP does not exist');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);

    it('should return category does not exist', () => {
        return cre.getBestCompany(40, 'FR', 'Real Estate')
        .then((result) => {
            assert.deepEqual(result, 'Category, Real Estate does not exist');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);

    it('should return country and category does not exist', () => {
        return cre.getBestCompany(40, 'NG', 'Real Estate')
        .then((result) => {
            assert.deepEqual(result, 'Country, NG and Category, Real Estate does not exist');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);

    it('should return no companies passed from base bid check', () => {
        return cre.getBestCompany(40, 'RU', 'Automobile')
        .then((result) => {
            assert.deepEqual(result, 'No Companies Passed from BaseBid Check');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);

    it('should return winning company', () => {
        return cre.getBestCompany(2, 'RU', 'IT')
        .then((result) => {
            assert.deepEqual(result, "Response = C3", 'these values are equal');
        })
        .catch((err) => {
            console.log(err);
        });
    }).timeout(15000);
});
