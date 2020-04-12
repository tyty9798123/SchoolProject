let mysql = require('../connections/mysql');
let timestamp = require('../common_lib/timestamp');
let createIsolators = async (data) => {
    return new Promise( (resolve, reject) => {
        let stmt = `
            INSERT INTO isolators (name, age, identification, passport, gender, birthday, 
                mailing_address, residence_address, phone, departure_date, entry_date, note)
            VALUES ('${data.name}', ${data.age}, '${data.identification}', '${data.passport}', ${data.gender}, '${ timestamp.datetimeConvert( data.birthday ) }',
                '${data.mailing_address}', '${data.residence_address}', '${data.phone}', '${ timestamp.datetimeConvert( data.departure_date ) }', '${ timestamp.datetimeConvert( data.entry_date ) }'
                , '${data.note}'
            )
        `;
        mysql.query(stmt, function(err, result){
            if (err) {
                reject();
            }
            else {
                resolve({
                    isolatorInsertedId: result.insertId
                });
            }
        })
    })
}

let createIsolation = async (data, id) => {
    return new Promise( (resolve, reject) => {
        
        let stmt = `
            insert into isolations (start_date, end_date, days, isolator_id, isolation_types_id)
            VALUES ('${ timestamp.datetimeConvert( data.start_date ) }', '${ timestamp.datetimeConvert( data.end_date ) }',
            ${data.days}, ${id}, ${data.isolation_type_id})
        `;
        mysql.query(stmt, function(err, result){
            if (err) {
                console.log(err);
                reject();
            }
            else {
                resolve({
                    isolationInsertId: result.insertId
                });
            }
        })
    })
}

let createTravelCountry = async (data, id) => {
    return new Promise( async (resolve, reject) => {
        for (let i = 0; i < data.selected_country_names.length; i++){
            let stmt = `
                Insert into travel_countries (country_name, isolator_id) values ('${data.selected_country_names[i]}', ${id})
            `;
            await mysql.query(stmt, function(err, result){
                if (err) {
                    console.log(err);
                    reject();
                }
            })
        }
        resolve();
    })
}

let getAllIsolators = async () => {
    return new Promise( async (resolve, reject) => {
        let stmt = `SELECT * FROM isolators;`;
        await mysql.query(stmt, (err, result) => {
            if (err) {
                reject();
            }
            else{
                resolve(result);
            }
        })
    })
}

let getAllIsolations = async () => {
    return new Promise( async (resolve, reject) => {
        let stmt = `SELECT * FROM isolations;`;
        await mysql.query(stmt, (err, result) => {
            if (err) {
                reject();
            }
            else{
                resolve(result);
            }
        })
    })
};

let getAllTravelCountries = async () => {
    return new Promise( async (resolve, reject) => {
        let stmt = `SELECT * FROM travel_countries;`;
        await mysql.query(stmt, (err, result) => {
            if (err) {
                reject();
            }
            else{
                resolve(result);
            }
        })
    })
}

let getAllGeolocations = async () => {
    return new Promise( async (resolve, reject) => {
        let stmt = `select * from mailing_address_geolocations`;
        await mysql.query(stmt, (err, result) => {
            if (err){
                reject();
            }
            else{
                resolve(result);
            }
        })
    })
}

let getAllSymptomTypes = async () => {
    return new Promise( async (resolve, reject) => {
        let stmt = `select * from symptom_types`;
        await mysql.query(stmt, (err, result) => {
            if (err){
                reject();
            }
            else{
                resolve(result);
            }
        })
    })
}

let add_mailing_address_geolocations = async (data, isolator_id) => {
    return new Promise( async (resolve, reject) => {
        let stmt = `insert into mailing_address_geolocations (latitude, longitude, isolator_id)
                    values ('${data.lat}', '${data.lng}', ${isolator_id})`;
        console.log(stmt);
        mysql.query(stmt, (err, result) => {
            if (err) {
                console.log(err);
                reject();
            }
            else{
                resolve();
            }
        })
    })
}
module.exports = {
    createIsolators,
    createIsolation,
    createTravelCountry,
    getAllIsolators,
    getAllIsolations,
    getAllTravelCountries,
    add_mailing_address_geolocations,
    getAllGeolocations,
    getAllSymptomTypes
}