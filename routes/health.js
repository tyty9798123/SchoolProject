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

module.exports = router;