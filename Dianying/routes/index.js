var express = require('express');
var users = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/process', function(req, res, next) {
  res.render('process',{title:'Dianying'});
});
router.post('/recommend', function(req, res, next) {
  users.dianying(req.body);
  res.render('recommend',{});
});
module.exports = router;
