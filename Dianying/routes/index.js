var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/process', function(req, res, next) {
  res.render('process',{title:'Dianying'});
});
module.exports = router;
