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
    async create(req, res, snext){
        /*
        // 字串內僅能有英語或數字和 [.] [_] 
                if ( UserVerify.justInputEngorNum(account) &&  UserVerify.justInputEngorNum(password) ){
        // 限制字串長度 6~20
                if ( UserVerify.wordCountLimit(account, 6, 20) &&  UserVerify.wordCountLimit(password, 6, 20) ){
        // 加密
                const hash_password = crypto.createHash('sha256').update(password).digest('base64');
                
                if (err) return res.json( { success: false, message: '與資料庫連結發生錯誤。' } );
                return res.json( { success: false, message: '帳號或密碼限制字串長度 6~20。' } )
                return res.json( { success: false, message: '字串內僅能有英語或數字和 [.] [_]。' } )
        */
        if (req.session.code !== req.body.captcha_text.toLowerCase()){
            return res.json( { success: false, message: '驗證碼輸入錯誤。' } )
        }
        // 確認資料都存在
        if ( req.body.name && req.body.account && req.body.password ){
            let name = req.body.name, account = req.body.account, password = req.body.password;
            const hashPassword = crypto.createHash('sha256').update(password).digest('base64');
            if ( !UserVerify.validateEmail(account) || !UserVerify.justInputEngorNum(password) ){
                return res.json( { success: false, message: '請輸入正確的Email、密碼僅能有英語或數字和 [.] [_]。' } );
            }
            if ( !UserVerify.validateEmail(account) || !UserVerify.wordCountLimit(password, 6, 20) ){
                return res.json( { success: false, message: '請輸入正確的Email、密碼限制字串長度 6~20。' } );
            }
            // 確認帳號未重複
            try {
                await muser.checkAccountNoRepeat(account);
            }
            catch(e) {
                return res.json( { success: false, message: '帳號已被使用。' } );
            }
            // 插入到資料庫
            try {
                req.body.password = hashPassword;
                await muser.createAnAccount(req.body);
                return res.json( { success: true } );
            }
            catch(e) {
                return res.json( { success: false, message: '與資料庫連結發生錯誤。' } );
            }
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
            return res.send(`您目前已處於登入狀態。<a href='/ntunhs/'>返回首頁</a>`);
        }
        res.render('login', {
            title: '登入',
            auth
        })
    }

    // method: POST
    // path: /login
    // Params: account, password
    async login(req, res, next){
        try {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            let { uid } = await muser.logIn(req.body);
            console.log(uid);
            req.session.uid = uid;
            res.json({
                success: true,
            })
        }
        catch(e) {
            res.json({
                success: false,
                message: '帳號或密碼輸入錯誤。',
            })
        }
    }

    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }

    async fb_success(req, res, next) {
        let data = {
            name: req.user.displayName,
            account: req.user._json.email,
            password: req.user.provider,
        }
        muser.checkAccountNoRepeat(req.user._json.email)
        .then(async ()=>{
            // 帳號沒人用 
            // 插入到資料庫
            try {
                let response = await muser.createAnAccount(data);
                // 註冊、登入成功
                req.session.uid = response.uid;
                res.send(`
                    <script>
                        alert('註冊、登入成功。');
                        location.href = '/ntunhs/';
                    </script>
                `);
            }
            catch(e) {
                console.log('與資料庫連結發生錯誤。');
            }
        })
        .catch(result => {
            if (result.message === '帳號已被使用。'){
                // 登入成功
                console.log(result.uid)
                req.session.uid = result.uid;
                res.send(`
                    <script>
                        alert('登入成功。');
                        location.href = '/ntunhs/';
                    </script>
                `);
            }
        })
    }
}

module.exports = UserController;