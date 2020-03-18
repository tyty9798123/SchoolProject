// import user_model.js
// import userdataverify.js
// import encrypt.js

class UserController{
    // Get sign_up Page
    new(req, res, next){
        let renderData = {
            title: "註冊"
          }
        res.render('signup', renderData);
    }
    // Post sign_up / create an account
    create(req, res,next){
        
    }
}

module.exports = UserController;