var express = require('express');
var router = express.Router();

let managementController = require('../controllers/management_controller');
managementController = new managementController();

router.get('/', function(req, res, next) {
  let auth = req.session.uid;
  res.render('./management/index.ejs', { title: 'Express', auth});
});
router.post('/', managementController.create);

module.exports = router;