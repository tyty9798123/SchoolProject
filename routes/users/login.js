var express = require('express');
var router = express.Router();
let userController = require('../../controllers/user_controller');
userController = new userController();

/* GET sign_up page. */
router.get('/', userController.showLogin);
router.get('/fb_success', userController.fb_success);

/* POST sign_up page */
router.post('/', userController.login);

module.exports = router;