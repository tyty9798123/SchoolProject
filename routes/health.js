var express = require('express');
var router = express.Router();
const mysql = require('../connections/mysql');
const timestamp = require('../common_lib/timestamp')
/* GET home page. */
router.get('/get_all_type', function(req, res, next) {
  mysql.query('SELECT * FROM physical_health_types', (err, result) => {
      if (err){
          
      }
      else{
          if (result[0]){
            let data = [];
            result.forEach(element => {
                data.push( {
                    id: element.id,
                    name: element.name,
                    image_url: element.image_url,
                    eng_name: element.eng_name,
                } )
            });
            res.json(data);
          }
      }
  })
});


router.get('/:id', function(req, res, next) {
  if (!req.session.uid) return res.redirect('/');
  let id = req.params.id;
  mysql.query(`SELECT * FROM physical_health_types WHERE id = ${id}`, (err, result) => {
    mysql.query(`SELECT * FROM body_measurement where user_id = ${req.session.uid} and physical_health_type_id = ${id}`, (err2, result2) => {
      console.log(result2)
      res.render('health/index', {
        auth : req.session.uid,
        title: '',
        result: result[0],
        past_data: result2,
        timestamp
      })
    })
  })
})

router.post('/', function(req, res, next) {
  let id = req.params.id;
  console.log(req.body)
  console.log(req.session.uid)

  mysql.query(`INSERT INTO body_measurement (value, physical_health_type_id, user_id) VALUES ('${req.body.value}', ${req.body.physical_health_type_id}, ${req.session.uid})`,
  function(err, result) {
    if (!err){
      res.send({
        success: true
      })
    }
  })
})

module.exports = router;