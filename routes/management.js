var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('./management/index.ejs', { title: 'Express', auth});
});


module.exports = router;