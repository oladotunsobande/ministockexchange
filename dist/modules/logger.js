'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  APP:        Mini Stock Exchange
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  MODULE:     Logging Module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  DEVELOPER:  Oladotun Sobande
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  CREATED ON: 13th August 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */

var _datetime = require('./datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        this.datetime = new _datetime2.default();
    }

    _createClass(Logger, [{
        key: 'logSevere',
        value: function logSevere(msg) {
            _fs2.default.appendFile(_path2.default.join('src/modules/logs/error.log'), msg, function (error) {
                if (error) {
                    console.log('ERR - ' + error);
                }
            });
        }
    }, {
        key: 'log',
        value: function log(msg) {
            var _this = this;

            var lgms = '[ ' + this.datetime.getCurrentDateTime() + ' ] - ' + msg + ' \r\n';

            _fs2.default.appendFile(_path2.default.join('src/modules/logs/server.log'), lgms, function (err) {
                if (err) {
                    var msge = '[ ' + _this.datetime.getCurrentDateTime() + ' ] - ' + err + ' \r\n';
                    _this.logSevere(msge);
                }
            });
        }
    }, {
        key: 'handleError',
        value: function handleError(err) {
            var msg = '[ ' + this.datetime.getCurrentDateTime() + ' ] - ' + err + ' \r\n';
            this.logSevere(msg);
        }
    }]);

    return Logger;
}();

exports.default = Logger;