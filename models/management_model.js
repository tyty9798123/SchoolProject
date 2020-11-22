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

let createHealthStatus = async data => {
    return new Promise( async (resolve, reject) => {
        let stmt = `INSERT INTO health_status (isolator_id, temperature, note, caring_at) 
        values (${data.isolatorID}, '${data.temperature}', '${data.note}', '${ timestamp.datetimeConvert( data.caringTime ) }')`;

        mysql.query(stmt, (err, result) => {
            if(err){
                reject();
            }
            else{
                resolve({
                    healthStatusID: result.insertId
                })
            }
        })
    })
}

let addToHealthSymptoms = async (data, id) => {
    return new Promise( async (resolve, reject) => {
        for (let i = 0; i < data.symptomTypes.length; i++){
            let stmt = `
                Insert into health_symptoms (health_status_id, symptom_type_id) values (${id}, ${data.symptomTypes[i]})
            `;
            console.log(stmt)
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

let getHealthStatus = async id => {
    return new Promise( async (resolve, reject) => {
        let stmt = `
            select a.temperature, a.note, a.caring_at, c.type_name 
            from health_status as a 
            inner join health_symptoms as b on b.health_status_id = a.id 
            inner join symptom_types as c on b.symptom_type_id = c.id where a.isolator_id = ${id}`;
        await mysql.query(stmt, (err, result) => {
            if (err){
                reject();
            }else{
                result.forEach( (item, index, array) => {
                    array[index].caring_at = timestamp.datetimeConvert(item.caring_at);
                })
                resolve(result);
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
    getAllSymptomTypes,
    createHealthStatus,
    addToHealthSymptoms,
    getHealthStatus
}