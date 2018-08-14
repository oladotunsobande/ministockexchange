'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Date and Time module
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

var DateTime = function () {
    function DateTime() {
        _classCallCheck(this, DateTime);

        this.today = new Date();
    }

    _createClass(DateTime, [{
        key: 'getMonthName',
        value: function getMonthName(mth) {
            var mon = null;

            switch (mth) {
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
    }, {
        key: 'getCurrentDateTime',
        value: function getCurrentDateTime() {
            var cur_mth = this.getMonthName(this.today.getMonth() + 1);
            var date = this.today.getDate() + '-' + cur_mth + '-' + this.today.getFullYear();
            var time = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
            return date + ' ' + time;
        }
    }]);

    return DateTime;
}();

exports.default = DateTime;