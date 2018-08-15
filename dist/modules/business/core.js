'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mydb = require('../db/mydb');

var _mydb2 = _interopRequireDefault(_mydb);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  APP:        Mini Stock Exchange
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  MODULE:     Stock Trading 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  DEVELOPER:  Oladotun Sobande
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  CREATED ON: 13th August 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

var Core = function (_Logger) {
    _inherits(Core, _Logger);

    function Core(conn) {
        _classCallCheck(this, Core);

        var _this = _possibleConstructorReturn(this, (Core.__proto__ || Object.getPrototypeOf(Core)).call(this));

        _this.conn = conn;
        _this.db = new _mydb2.default();
        return _this;
    }

    _createClass(Core, [{
        key: 'formatValue',
        value: function formatValue(val) {
            var fnl = '';
            var cnt = val.split("\\");

            for (var i in cnt) {
                fnl += cnt[i];
            }

            return JSON.parse(fnl.trim().substring(0, fnl.length));
        }
    }, {
        key: 'getBestCompany',
        value: function getBestCompany(bid_amt, cty_cd, cat_nme) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                Promise.all([_this2.getEntityId('country', cty_cd), _this2.getEntityId('category', cat_nme)]).then(function (ls) {
                    //console.log('Rsp: '+ls);
                    if (ls[0] > 0 && ls[1] > 0) {
                        return _this2.matchByCountryCategory(ls[0], ls[1]);
                    } else {
                        var msg = void 0;

                        if (ls[0] == 0 && ls[1] !== 0) {
                            msg = 'Country, ' + cty_cd + ' does not exist';
                        } else if (ls[0] !== 0 && ls[1] == 0) {
                            msg = 'Category, ' + cat_nme + ' does not exist';
                        } else if (ls[0] == 0 && ls[1] == 0) {
                            msg = 'Country, ' + cty_cd + ' and Category, ' + cat_nme + ' does not exist';
                        }

                        resolve(msg);
                    }
                }).then(function (rs) {
                    var mtch_dt = rs.cpy_dt;
                    var log = rs.log_dt;

                    //console.log('targeting: '+JSON.stringify(mtch_dt));

                    _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'log', _this2).call(_this2, log);

                    if (mtch_dt.length == 0) {
                        resolve('No Companies Passed from Targeting');
                    } else {
                        return _this2.bidBudgetCheck(bid_amt, JSON.stringify(mtch_dt), 'budget');
                    }
                }).then(function (vl) {
                    //console.log('cmbk: '+JSON.stringify(vl));
                    var chk_dt = vl.cpy_dt;
                    var lg = vl.log_dt;

                    //console.log('budget: '+JSON.stringify(chk_dt));

                    _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'log', _this2).call(_this2, lg);

                    if (chk_dt.length == 0) {
                        resolve('No Companies Passed from Budget');
                    } else {
                        return _this2.bidBudgetCheck(bid_amt, JSON.stringify(chk_dt), 'bid');
                    }
                }).then(function (res) {
                    var cp_ls = res.cpy_dt;
                    var lgg = res.log_dt;

                    //console.log('bid: '+JSON.stringify(cp_ls));

                    _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'log', _this2).call(_this2, lgg);

                    if (cp_ls.length == 0) {
                        resolve('No Companies Passed from BaseBid Check');
                    } else {
                        return _this2.getWinner(cp_ls);
                    }
                }).then(function (cpy) {
                    _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'log', _this2).call(_this2, 'Winner = ' + cpy);
                    resolve('Response = ' + cpy);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }, {
        key: 'getWinner',
        value: function getWinner(lst) {
            var srt_lst = lst.sort(function (a, b) {
                return b.bd_prc - a.bd_prc;
            });
            return srt_lst[0].cpy_id;
        }
    }, {
        key: 'bidBudgetCheck',
        value: function bidBudgetCheck(bid_amt, cpy_dt, prs_typ) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var sql = 'CALL bgt_bid_sff(?,?,?,@out,@err); SELECT @out as rs, @err as erm;';
                var prm = [prs_typ, bid_amt, cpy_dt];

                _this3.callQuery(sql, prm, 'bidBudgetCheck').then(function (res) {
                    //console.log('bid check rsp: '+JSON.stringify(res));
                    resolve(_this3.formatValue(res));
                }).catch(function (err) {
                    reject(99);
                });
            });
        }
    }, {
        key: 'getEntityId',
        value: function getEntityId(enty_typ, enty_vl) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var sql = 'CALL get_enty_id(?,?,@out,@err); SELECT @out as rs, @err as erm;';
                var prm = [enty_typ, enty_vl];

                _this4.callQuery(sql, prm, 'getEntityId').then(function (res) {
                    resolve(res);
                }).catch(function (err) {
                    reject(99);
                });
            });
        }
    }, {
        key: 'matchByCountryCategory',
        value: function matchByCountryCategory(cty_id, cat_id) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var sql = 'CALL mtch_by_cty_cat(?,?,@out,@err); SELECT @out as rs, @err as erm;';
                var prm = [cty_id, cat_id];

                _this5.callQuery(sql, prm, 'matchByCountryCategory').then(function (res) {
                    //console.log('mtch rsp: '+JSON.stringify(res));
                    resolve(_this5.formatValue(res));
                }).catch(function (err) {
                    reject(99);
                });
            });
        }
    }, {
        key: 'callQuery',
        value: function callQuery(sql, parm, mtd_nm) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                _this6.db.execQuery(sql, parm, _this6.conn).then(function (val) {
                    if (val[1][0].erm !== null && val[1][0].rs === null) {
                        var msg = '(' + mtd_nm + ') - ' + val[1][0].erm;
                        _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'handleError', _this6).call(_this6, msg);
                        reject(99);
                    } else {
                        resolve(val[1][0].rs);
                    }
                }).catch(function (err) {
                    _get(Core.prototype.__proto__ || Object.getPrototypeOf(Core.prototype), 'handleError', _this6).call(_this6, '(' + mtd_nm + ') - ' + err);
                    reject(99);
                });
            });
        }
    }]);

    return Core;
}(_logger2.default);

exports.default = Core;