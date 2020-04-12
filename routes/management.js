var express = require('express');
var router = express.Router();

let managementController = require('../controllers/management_controller');
managementController = new managementController();

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
module.exports = router;