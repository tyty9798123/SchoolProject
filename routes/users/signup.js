var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let renderData = {
    title: "註冊"
  }
  res.render('signup', renderData);
});

module.exports = router;