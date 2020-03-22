var express = require('express');
var router = express.Router();
let userController = require('../../controllers/user_controller');
userController = new userController();

/* GET sign_up page. */
router.get('/', userController.showLogin);

/* POST sign_up page */
router.post('/', userController.login);

module.exports = router;