'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  APP:        Mini Stock Exchange
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  MODULE:     Restful Web Services Interface
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  DEVELOPER:  Oladotun Sobande
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  CREATED ON: 13th August 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */

var _core = require('../business/core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rws = function () {
    function Rws(conn) {
        _classCallCheck(this, Rws);

        this.conn = conn;
    }

    _createClass(Rws, [{
        key: 'filterWinner',
        value: function filterWinner(bd_amt, cat_nm, cty_id) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var cre = new _core2.default(_this.conn);

                cre.getBestCompany(bd_amt, cty_id, cat_nm).then(function (rsp) {
                    resolve(rsp);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }]);

    return Rws;
}();

exports.default = Rws;