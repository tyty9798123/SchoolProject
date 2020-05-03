var express = require('express');
var router = express.Router();
const passport = require('../OAuth/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('index', { title: '首頁', auth});
});

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/login/fb_success',
                                      failureRedirect: '/login' }));
module.exports = router;
