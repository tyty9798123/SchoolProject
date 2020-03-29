var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('./management/index.ejs', { title: 'Express', auth});
});
router.get('/add_home_quarantine', function(req, res, next) {
  let auth = req.session.uid;
  res.render('./management/add_home_quarantine.ejs', { title: 'Express', auth});
});


module.exports = router;