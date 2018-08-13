/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     REST Web Service Endpoints
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import express from 'express';

import MyDb from '../modules/data/mydb';
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
    console.log(err);
});


/*
*==================================================
* API Endpoints 
*==================================================
*/

router.post('/signup/:userType', (req, res, next) => {
    var usr_typ = req.params.userType;
    var py_ld = req.body;

    res.set('Content-Type', 'application/json');

    var wbs = new Rws(conn);

    wbs.onboard(usr_typ, py_ld)
    .then((rs) => {
        if(rs == 1){
            res.status(200).send({ "status": true, "message": "User account created successfully" });
        }
        else if (rs == 'Email Exists'){
            res.status(200).send({ "status": false, "message": "User email already exists" });
        }
    })
    .catch((err) => {
        console.log('Err: '+err);
        res.status(500).send({ "error": "Oops! Something went wrong" });
    });
});

export default router;
