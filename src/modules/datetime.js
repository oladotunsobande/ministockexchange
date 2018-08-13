/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Date and Time module
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

export default class DateTime{
    constructor(){
        this.today = new Date();
    }

    getMonthName(mth){
        let mon = null;

        switch(mth){
            case 1:
                mon = 'JAN';
                break;
            case 2:
                mon = 'FEB';
                break;
            case 3:
                mon = 'MAR';
                break;
            case 4:
                mon = 'APR';
                break;
            case 5:
                mon = 'MAY';
                break;
            case 6:
                mon = 'JUN';
                break;
            case 7:
                mon = 'JUL';
                break;
            case 8:
                mon = 'AUG';
                break;
            case 9:
                mon = 'SEP';
                break;
            case 10:
                mon = 'OCT';
                break;
            case 11:
                mon = 'NOV';
                break;
            case 12:
                mon = 'DEC';
                break;
        }
        return mon;
    }
    
    getCurrentDateTime(){
        let cur_mth = this.getMonthName(this.today.getMonth()+1);
        let date = `${this.today.getDate()}-${cur_mth}-${this.today.getFullYear()}`;
        let time = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
        return `${date} ${time}`;
    }
}
