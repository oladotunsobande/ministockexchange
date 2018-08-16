/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Stock Trading 
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import MyDb from '../db/mydb';
import Logger from '../logger';

export default class Core extends Logger{
    constructor(conn){
        super();

        this.conn = conn;
        this.db = new MyDb();
    }

    formatValue(val){
        var fnl = '';
        var cnt = val.split("\\");

        for(var i in cnt){
            fnl += cnt[i];
        }

        return JSON.parse(fnl.trim().substring(0, fnl.length));
    }

    getBestCompany(bid_amt, cty_cd, cat_nme){
        return new Promise((resolve, reject) => {
            Promise.all([ this.getEntityId('country', cty_cd), this.getEntityId('category', cat_nme) ])
            .then((ls) => {
                //console.log('Rsp: '+ls);
                if(ls[0] > 0 && ls[1] > 0){
                    return this.matchByCountryCategory(ls[0], ls[1]);
                }
                else{
                    let msg;

                    if(ls[0] == 0 && ls[1] !== 0){
                        msg =  `Country, ${cty_cd} does not exist`;
                    }
                    else if(ls[0] !== 0 && ls[1] == 0){
                        msg =  `Category, ${cat_nme} does not exist`;
                    }
                    else if(ls[0] == 0 && ls[1] == 0){
                        msg =  `Country, ${cty_cd} and Category, ${cat_nme} does not exist`;
                    }
                    
                    resolve(msg);
                }
            })
            .then((rs) => {
                let mtch_dt = rs.cpy_dt;
                let log = rs.log_dt;

                //console.log('targeting: '+JSON.stringify(mtch_dt));

                super.log(log);

                if(mtch_dt.length == 0){
                    resolve('No Companies Passed from Targeting');
                }
                else{
                    return this.bidBudgetCheck(bid_amt, JSON.stringify(mtch_dt), 'budget');
                }
            })
            .then((vl) => {
                //console.log('cmbk: '+JSON.stringify(vl));
                let chk_dt = vl.cpy_dt;
                let lg = vl.log_dt;

                //console.log('budget: '+JSON.stringify(chk_dt));

                super.log(lg);

                if(chk_dt.length == 0){
                    resolve('No Companies Passed from Budget');
                }
                else{
                    return this.bidBudgetCheck(bid_amt, JSON.stringify(chk_dt), "bid");
                }
            })
            .then((rsp) => {
                let cpls = rsp.cpy_dt;
                let lgg = rsp.log_dt;

                //console.log('bid: '+JSON.stringify(cpls));

                super.log(lgg);

                if(cpls.length == 0){
                    resolve('No Companies Passed from BaseBid Check');
                }
                else{
                    let cpy = this.getWinner(cpls);
                    super.log(`Winner = ${cpy}`);
                    resolve(`Response = ${cpy}`);
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    getWinner(lst){
        let srt_lst = lst.sort((a,b) => { return b.bd_prc - a.bd_prc; });
        return srt_lst[0].cpy_id;
    }

    bidBudgetCheck(bid_amt, cpy_dt, prs_typ){
        return new Promise((resolve, reject) => {
            let sql = 'CALL bgt_bid_sff(?,?,?,@out,@err); SELECT @out as rs, @err as erm;';
            let prm = [ prs_typ, bid_amt, cpy_dt ];

            this.callQuery(sql, prm, 'bidBudgetCheck')
            .then((res) => {
                //console.log('bid check rsp: '+JSON.stringify(res));
                resolve(this.formatValue(res));
            })
            .catch((err) => {
                reject(99);
            });
        });
    }

    getEntityId(enty_typ, enty_vl){
        return new Promise((resolve, reject) => {
            let sql = 'CALL get_enty_id(?,?,@out,@err); SELECT @out as rs, @err as erm;';
            let prm = [ enty_typ, enty_vl ];

            this.callQuery(sql, prm, 'getEntityId')
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(99);
            });
        });
    }

    matchByCountryCategory(cty_id, cat_id){
        return new Promise((resolve, reject) => {
            let sql = 'CALL mtch_by_cty_cat(?,?,@out,@err); SELECT @out as rs, @err as erm;';
            let prm = [ cty_id, cat_id ];

            this.callQuery(sql, prm, 'matchByCountryCategory')
            .then((res) => {
                //console.log('mtch rsp: '+JSON.stringify(res));
                resolve(this.formatValue(res));
            })
            .catch((err) => {
                reject(99);
            });
        });
    }

    callQuery(sql, parm, mtd_nm){
        return new Promise((resolve, reject) => {
            this.db.execQuery(sql, parm, this.conn)
            .then((val) => {
                if(val[1][0].erm !== null && val[1][0].rs === null){
                    var msg = `(${mtd_nm}) - ${val[1][0].erm}`;
                    super.handleError(msg);
                    reject(99);
                }
                else{
                    resolve(val[1][0].rs);
                }
            })
            .catch((err) => {
                super.handleError(`(${mtd_nm}) - ${err}`);
                reject(99);
            });
        });
    }
}