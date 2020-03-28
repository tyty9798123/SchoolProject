// import user_model.js
// import userdataverify.js
// import encrypt.js
let muser = require('../models/user_model');
let UserVerify = require('../common_lib/userdataverify');
let crypto = require('crypto');

class UserController{
    // Get sign_up Page
    new(req, res, next){
        let auth = req.session.uid;
        let renderData = {
            title: "註冊",
            auth
        }
        res.render('signup', renderData);
    }
    // method: POST
    // path /signup
    // Params: name, account, password, captcha_text
    create(req, res, snext){
        if (req.session.code !== req.body.captcha_text.toLowerCase()){
            return res.json( { success: false, message: '驗證碼輸入錯誤。' } )
        }
        // 確認資料都存在
        if ( req.body.name && req.body.account && req.body.password ){
            let name = req.body.name, account = req.body.account, password = req.body.password;
            muser.findOne({account:account}).then(function( result ){
                if(result){
                    return res.json( { success: false, message: '帳號已存在。' } );
                }
                // 字串內僅能有英語或數字和 [.] [_] 
                if ( UserVerify.justInputEngorNum(account) &&  UserVerify.justInputEngorNum(password) ){
                    // 限制字串長度 6~20
                    if ( UserVerify.wordCountLimit(account, 6, 20) &&  UserVerify.wordCountLimit(password, 6, 20) ){
                        const hash_password = crypto.createHash('sha256').update(password).digest('base64');
                        var save_test = new muser({
                            name: name,
                            account: account,
                            password: hash_password
                        });
                        save_test.save(function(err){
                            if (err) return res.json( { success: false, message: '與資料庫連結發生錯誤。' } );
                            return res.json( { success: true } );
                        })
                    }
                    else{
                        return res.json( { success: false, message: '帳號或密碼限制字串長度 6~20。' } )
                    }
                }
                else{
                    return res.json( { success: false, message: '字串內僅能有英語或數字和 [.] [_]。' } )
                }
            })
        }
        else{
            return res.json( { success: false, message: '系統發生錯誤。' } )
        }
    }
    // method: GET
    // path /login
    // Params: None
    showLogin(req, res, next){
        let auth = req.session.uid;
        if (req.session.uid){   
            return res.send(`您目前已處於登入狀態。<a href='/'>返回首頁</a>`);
        }
        res.render('login', {
            title: '登入',
            auth
        })
    }

    // method: POST
    // path: /login
    // Params: account, password
    login(req, res, next){
        if(req.body.account && req.body.password){
            muser.findOne({
                account: req.body.account,
                password: crypto.createHash('sha256').update(req.body.password).digest('base64')
            })
            .then(function(result){
                if(!result){
                    return res.json({
                        success: false,
                        message: '帳號或密碼錯誤。',
                    })
                }
                else{
                    req.session.uid = result._id;
                    return res.json({
                        success: true,
                    })
                }
            })
        }
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = UserController;