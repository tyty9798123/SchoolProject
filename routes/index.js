var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('index', { title: '首頁', auth});
});

module.exports = router;
