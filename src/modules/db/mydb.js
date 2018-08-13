/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Database Connection Manager
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import mysql from 'mysql';
import Logger from '../logger';
import DateTime from '../datetime';

export default class MyDb extends Logger{
    constructor(){
        super();

        this.db = null;
        this.host = null;
        this.user = null;
        this.password = null;

        this.conn = null;
        this.datetime = new DateTime();
    }

    setParams(){
        this.db = process.env.MYSQL_DB;
        this.host = process.env.MYSQL_HOST;
        this.user = process.env.MYSQL_USER;
        this.password = process.env.MYSQL_SECRET;
    }

    init(){
        return new Promise((resolve, reject) => {
            this.setParams();
            var cnn = mysql.createConnection({
                multipleStatements  : true,
                host                : this.host,
                user                : this.user,
                password            : this.password,
                database            : this.db
            });

            cnn.connect((err) => {
                if(err){
                    super.handleError(err);
                    reject(false);
                }
                else{
                    var msg = `[ ${this.datetime.getCurrentDateTime()} ] - Connection Pool Created \r\n`;
                    super.log(msg);
                    resolve(cnn);
                }
            });
        });
    }

    execQuery(sql, params, conn){
        return new Promise((resolve, reject) => {
            if(params == null){
                conn.query(sql, (err, results) => {
                    if (err) {
                        super.handleError(err);
                        super.handleError(err.fatal);
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                });
            }
            else{
                conn.query(sql, params, (err, results) => {
                    if (err) {
                        super.handleError(err);
                        super.handleError(err.fatal);
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
                });
            }
        });
    }
}