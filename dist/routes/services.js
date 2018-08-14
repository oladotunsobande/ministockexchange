'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               *  APP:        Mini Stock Exchange
                                                                                                                                                                                                                                                                               *  MODULE:     REST Web Service Endpoints
                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                               *  DEVELOPER:  Oladotun Sobande
                                                                                                                                                                                                                                                                               *  CREATED ON: 13th August 2018
                                                                                                                                                                                                                                                                               * */

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mydb = require('../modules/db/mydb');

var _mydb2 = _interopRequireDefault(_mydb);

var _rws = require('../modules/api/rws');

var _rws2 = _interopRequireDefault(_rws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var conn = null;

var initDb = function initDb() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var conn = new _mydb2.default();

            conn.init().then(function (val) {
                console.log('Db init complete');
                resolve(val);
            }).catch(function (err) {
                reject(err);
            });
        }, 2000);
    });
};

initDb().then(function (res) {
    conn = res;
}).catch(function (err) {
    console.log('DB ini error: ' + err);
});

/*
*==================================================
* API Endpoints 
*==================================================
*/

router.get('/divide', function (req, res, next) {
    var num = req.query.number;
    var dvdr = req.query.divider;
    var rs = Number(num) / Number(dvdr);

    console.log('type: ' + (typeof rs === 'undefined' ? 'undefined' : _typeof(rs)) + ' ans: ' + String(rs));

    if (rs !== Infinity) {
        res.status(200).send(String(rs));
    } else if (rs == Infinity) {
        res.status(500).send(String(rs));
    }
});

router.get('/trade', function (req, res, next) {
    var cty_cd = req.query.CountryCode;
    var cat_nm = req.query.Category;
    var bid = req.query.BaseBid;

    res.set('Content-Type', 'application/json');

    if (bid !== '' && cat_nm !== '' && cty_cd !== '') {
        var wbs = new _rws2.default(conn);

        wbs.filterWinner(bid, cat_nm, cty_cd).then(function (rs) {
            res.status(200).send({ "message": rs });
        }).catch(function (err) {
            console.log('Err: ' + err);
            res.status(500).send({ "error": "Oops! Something went wrong" });
        });
    } else {
        var msg = void 0;

        if (bid == '' && cat_nm !== '' && cty_cd !== '') {
            msg = 'Provide value for BaseBid';
        } else if (bid !== '' && cat_nm == '' && cty_cd !== '') {
            msg = 'Provide value for Category';
        } else if (bid !== '' && cat_nm !== '' && cty_cd == '') {
            msg = 'Provide value for CountryCode';
        } else if (bid == '' && cat_nm == '' && cty_cd == '') {
            msg = 'Provide values for BaseBid, Category and CountryCode';
        }
        res.status(200).send({ "message": msg });
    }
});

exports.default = router;