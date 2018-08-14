/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     REST Web Service Endpoints
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import express from 'express';

import MyDb from '../modules/db/mydb';
import Rws from '../modules/api/rws';

var router = express.Router();

var conn = null;

const initDb = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var conn = new MyDb();
        
            conn.init()
            .then((val) => {
                console.log('Db init complete');
                resolve(val);
            })
            .catch((err) => {
                reject(err);
            });
        }, 2000);
    });
}

initDb()
.then((res) => {
    conn = res;
})
.catch((err) => {
    console.log('DB ini error: '+err);
});


/*
*==================================================
* API Endpoints 
*==================================================
*/

router.get('/divide', (req, res, next) => {
    let num = req.query.number;
    let dvdr = req.query.divider;
    let rs = Number(num) / Number(dvdr);

    console.log('type: '+typeof rs+' ans: '+String(rs));

    if(rs !== Infinity){
        res.status(200).send(String(rs));
    }
    else if(rs == Infinity){
        res.status(500).send(String(rs));
    }
});

router.get('/trade', (req, res, next) => {
    let cty_cd = req.query.CountryCode;
    let cat_nm = req.query.Category;
    let bid = req.query.BaseBid;

    res.set('Content-Type', 'application/json');

    if(bid !== '' && cat_nm !== '' && cty_cd !== ''){
        var wbs = new Rws(conn);

        wbs.filterWinner(bid, cat_nm, cty_cd)
        .then((rs) => {
            res.status(200).send({ "message": rs });
        })
        .catch((err) => {
            console.log('Err: '+err);
            res.status(500).send({ "error": "Oops! Something went wrong" });
        });
    }
    else{
        let msg;

        if(bid == '' && cat_nm !== '' && cty_cd !== ''){
            msg = 'Provide value for BaseBid';
        }
        else if(bid !== '' && cat_nm == '' && cty_cd !== ''){
            msg = 'Provide value for Category';
        }
        else if(bid !== '' && cat_nm !== '' && cty_cd == ''){
            msg = 'Provide value for CountryCode';
        }
        else if(bid == '' && cat_nm == '' && cty_cd == ''){
            msg = 'Provide values for BaseBid, Category and CountryCode';
        }
        res.status(200).send({ "message": msg });
    }
});

export default router;
