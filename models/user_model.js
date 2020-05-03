let mysql = require('../connections/mysql');


let checkAccountNoRepeat = (account) => {
    return new Promise( (resolve, reject) => {
        let stmt = `SELECT * FROM users where account = '${account}';`;
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

let createAnAccount = (data) => {
    let { name } = data;
    let { account } = data;
    let { password } = data;
    let stmt = `
        INSERT INTO users (name, account, password, is_admin, sign_in_count)
        VALUES ('${name}', '${account}', '${password}', 0, 0)
    `;
    return new Promise( (resolve, reject) => {
        mysql.query(stmt, (err, result) => {
            if (err){
                reject();
            }
            else{
                resolve();
            }
        })
    })
}

module.exports = {
    checkAccountNoRepeat,
    createAnAccount
}