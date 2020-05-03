var express = require('express');
var router = express.Router();
var mysql = require('../connections/mysql');
var timestamp = require('../common_lib/timestamp');

let managementController = require('../controllers/management_controller');
managementController = new managementController();

router.use((req, res, next) => {
  if (!req.session.uid){
    return res.render('error_message', {
      title: '錯誤，權限不足。',
      auth: 0
    });
  }
  mysql.query(`SELECT is_admin FROM users WHERE id = ${req.session.uid}`, (err, result) => {
    if(err) {
      return res.render('error_message', {
        title: '資料庫連接失敗。',
        auth: 0
      });
    }
    else{
      if (result[0]){
        if (result[0].is_admin === 1){
          next();
        }
        else {
          return res.render('error_message', {
            title: '錯誤，權限不足。',
            auth: req.session.uid
          });
        }
      }else{
        return res.render('error_message.ejs', {
          title: '錯誤，權限不足。',
          auth: req.session.uid
        });
      }
    }
  })
})
router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('./management/index.ejs', { title: '管理', auth});
});
router.post('/', managementController.create);

router.get('/get_all_isolator_info', managementController.getAllIsolatorInfo);

router.get('/maps', function(req, res) {
  let auth = req.session.uid;
  res.render('./management/maps/index.ejs', {
    title: 'Maps',
    auth,
  })
})
router.get('/get_all_symptom_types', managementController.getAllSymptomTypes);
router.post('/add_health_status', managementController.addHealthStatus);
router.get('/personal_temperature', (req, res, next) => {
  res.render('./management/charts/personal_temperature');
});

router.get('/get_recent_temperature_by_id', (req, res, next) => {
  //測試使用，先別放進Model、Controller，程式碼少，其實不難管理。
  let id = req.query.id;
  //取出最近10筆
  mysql.query(
    `Select temperature, caring_at from health_status where isolator_id = ${id} order by caring_at desc limit 10`,
    (err, result) => {
      if(err){
        return res.send( {success: false} );
      }else{
        if (!result[0]) return res.send( {success: false} );
        result.reverse().forEach((item, index, array) => {
          array[index].caring_at = timestamp.datetimeConvert(item.caring_at)
        })
        return res.send( {success: true, result} );
      }
    }
  )
})

router.get('/get_all_symptoms_count', (req, res, next) => {
  //測試使用，先別放進Model、Controller，程式碼少，其實不難管理。
})

router.get('/get_health_status_by_id', managementController.getHealthStatusById)
module.exports = router;