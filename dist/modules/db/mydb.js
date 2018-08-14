'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _datetime = require('../datetime');

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  APP:        Mini Stock Exchange
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  MODULE:     Database Connection Manager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  DEVELOPER:  Oladotun Sobande
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  CREATED ON: 13th August 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

var MyDb = function (_Logger) {
    _inherits(MyDb, _Logger);

    function MyDb() {
        _classCallCheck(this, MyDb);

        var _this = _possibleConstructorReturn(this, (MyDb.__proto__ || Object.getPrototypeOf(MyDb)).call(this));

        _this.db = null;
        _this.host = null;
        _this.user = null;
        _this.password = null;

        _this.conn = null;
        _this.datetime = new _datetime2.default();
        return _this;
    }

    _createClass(MyDb, [{
        key: 'setParams',
        value: function setParams() {
            this.db = process.env.MYSQL_DB;
            this.host = process.env.MYSQL_HOST;
            this.user = process.env.MYSQL_USER;
            this.password = process.env.MYSQL_SECRET;
        }
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.setParams();
                var cnn = _mysql2.default.createConnection({
                    multipleStatements: true,
                    host: _this2.host,
                    user: _this2.user,
                    password: _this2.password,
                    database: _this2.db
                });

                cnn.connect(function (err) {
                    if (err) {
                        _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'handleError', _this2).call(_this2, err);
                        reject(false);
                    } else {
                        var msg = '[ ' + _this2.datetime.getCurrentDateTime() + ' ] - Connection Pool Created \r\n';
                        _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'log', _this2).call(_this2, msg);
                        resolve(cnn);
                    }
                });
            });
        }
    }, {
        key: 'execQuery',
        value: function execQuery(sql, params, conn) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                if (params == null) {
                    conn.query(sql, function (err, results) {
                        if (err) {
                            _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'handleError', _this3).call(_this3, err);
                            _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'handleError', _this3).call(_this3, err.fatal);
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                } else {
                    conn.query(sql, params, function (err, results) {
                        if (err) {
                            _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'handleError', _this3).call(_this3, err);
                            _get(MyDb.prototype.__proto__ || Object.getPrototypeOf(MyDb.prototype), 'handleError', _this3).call(_this3, err.fatal);
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        }
    }]);

    return MyDb;
}(_logger2.default);

exports.default = MyDb;