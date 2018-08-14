'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: './public/' });
});

/* Serve Test page. */
router.get('/test', function (req, res, next) {
  res.sendFile('test.html', { root: './public/' });
});

router.get('/libraries/mocha/:fle', function (req, res, next) {
  var flnm = req.params.fle;
  res.sendFile(flnm, { root: './node_modules/mocha/' });
});

router.get('/libraries/chai/:fle', function (req, res, next) {
  var flnm = req.params.fle;
  res.sendFile(flnm, { root: './node_modules/chai/' });
});

router.get('/libraries/chai-http/dist/:fle', function (req, res, next) {
  var flnm = req.params.fle;
  res.sendFile(flnm, { root: './node_modules/chai-http/dist/' });
});

exports.default = router;