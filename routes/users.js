var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/information', function(req, res, next) {
  res.render('users/information.ejs', {
    title: '變更會員資料',
  });
})

router.get('/add_isolation', function(req, res, next) {
  
})
module.exports = router;
