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
                        message: '帳號已被使用。',
                        uid: result[0].id
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
        INSERT INTO users (name, account, password, is_admin)
        VALUES ('${name}', '${account}', '${password}', 0)
    `;
    return new Promise( (resolve, reject) => {
        mysql.query(stmt, (err, result) => {
            if (err){
                reject();
            }
            else{
                resolve({
                    uid: result.insertId
                });
            }
        })
    })
}

let logIn = (data) => {
    let { account } = data;
    let { password } = data;
    let stmt = `
        SELECT * FROM users WHERE account = '${account}' and password = '${password}';
    `;
    console.log(stmt)
    return new Promise( (resolve, reject) => {
        mysql.query(stmt, (err, result) => {
            if (err) {
                reject();
            }
            else{
                if (result[0]){
                    console.log(result)
                    resolve({
                        uid: result[0].id
                    })
                }
                else{
                    reject();
                }
            }
        })
    })
}

module.exports = {
    checkAccountNoRepeat,
    createAnAccount,
    logIn
}