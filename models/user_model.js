let mysql = require('../connections/mysql');

/*
let checkAccountNoRepeat = (data) => {
    return new Promise( (resolve, reject) => {
        let account = data.account;
        let stmt = `SELECT * FROM users where account = ${account};`;
        mysql.query(stmt, (err, result) => {
            if(err){
                reject({
                    message: "與資料庫連接發生錯誤。",
                });
            }else{
                if (result[0]){
                    reject({
                        message: '帳號已被使用。'
                    })
                }else{
                    resolve();
                }
            }
        })
    })
}

//let addAdmin = (resolve,)

module.exports = {
    checkAccountNoRepeat,
}
*/