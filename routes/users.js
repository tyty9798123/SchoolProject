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

router.get('/set_my_isolation_info', function(req, res, next) {
  res.render('users/set_my_isolation_info', {
    title: '設定我的隔離資訊'
  })
})

router.get('/record_my_physical_health', function(req, res, next){
  res.render('users/record_my_physical_health', {
    title: '紀錄我的身體健康狀況'
  })
})

var multer  = require('multer')
var upload = multer()

/* update Avatar */
router.post('/update_avatar', upload.array(), function(req, res) {
  /* 
    3 values
    
    1. avatar (Binary file)
    2. read_name (String)
    3. self_introduction(String)
  */
 console.log(req);
})
module.exports = router;
