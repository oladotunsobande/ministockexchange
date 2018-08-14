import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: './public/'});
});

/* Serve Test page. */
router.get('/test', (req, res, next) => {
  res.sendFile('test.html', {root: './public/'});
});

router.get('/libraries/mocha/:fle', (req, res, next) => {
  var flnm = req.params.fle;
  res.sendFile(flnm, {root: './node_modules/mocha/'});
});

router.get('/libraries/chai/:fle', (req, res, next) => {
  var flnm = req.params.fle;
  res.sendFile(flnm, {root: './node_modules/chai/'});
});

router.get('/libraries/chai-http/dist/:fle', (req, res, next) => {
  var flnm = req.params.fle;
  res.sendFile(flnm, {root: './node_modules/chai-http/dist/'});
});

export default router;
