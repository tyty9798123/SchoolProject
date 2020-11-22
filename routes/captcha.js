const router = require('express').Router();
const svgCaptcha = require('svg-captcha');

router.post('/', (req, res, next) => {
    var codeConfig = {
        size: 5,// 驗證碼長度
        ignoreChars: '0o1i', // 驗證碼字元中排除 0o1i
        noise: 2, // 干擾線條的數量
        height: 44
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.code = captcha.text.toLowerCase(); //將驗證碼存於session
    var codeData = {
        img:captcha.data
    }
    res.json({
        status: 1,
        result: codeData,
        msg: '驗證碼'
    });
})

module.exports = router;