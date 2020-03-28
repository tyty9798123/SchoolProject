var express = require('express');
var router = express.Router();
let userController = require('../../controllers/user_controller');
userController = new userController();

/* GET sign_up page. */
router.get('/', userController.logout);


module.exports = router;