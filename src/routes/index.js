import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: './public/'});
});

export default router;
