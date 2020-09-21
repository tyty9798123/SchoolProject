var express = require('express');
var router = express.Router();
const mysql = require('../connections/mysql');
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
  let id = req.params.id;
  mysql.query(`SELECT * FROM physical_health_types WHERE id = ${id}`, (err, result) => {
    res.render('health/index', {
      auth : req.session.uid,
      title: '',
      result: result[0]
    })
  })
})


module.exports = router;