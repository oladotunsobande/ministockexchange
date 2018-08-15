/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Restful Web Services Interface
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import Core from '../business/core';

export default class Rws{
    constructor(conn){
        this.conn = conn;
    }

    filterWinner(bd_amt, cat_nm, cty_id){
        return new Promise((resolve, reject) => {
            let cre = new Core(this.conn);

            cre.getBestCompany(Number(bd_amt), cty_id, cat_nm)
            .then((rsp) => {
                resolve(rsp);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }    
} 