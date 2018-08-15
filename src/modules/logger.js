/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Logging Module
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import DateTime from './datetime';
import fs from 'fs';
import path from 'path';

export default class Logger{
    constructor(){
        this.datetime = new DateTime();
    }

    logSevere(msg){
        fs.appendFile(path.join('src/modules/logs/error.log'), msg, (error) => {
            if (error){
                console.log('ERR - '+error);
            }
        });
    }

    log(msg){
        var lgms = `[ ${this.datetime.getCurrentDateTime()} ] - ${msg} \r\n`;

        fs.appendFile(path.join(`src/modules/logs/server.log`), lgms, (err) => {
            if (err){
                var msge = `[ ${this.datetime.getCurrentDateTime()} ] - ${err} \r\n`;
                this.logSevere(msge);
            }
        });
    }

    handleError(err){
        var msg = `[ ${this.datetime.getCurrentDateTime()} ] - ${err} \r\n`;
        this.logSevere(msg);
    }
}