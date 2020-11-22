let managementModel = require('../models/management_model');
let muser = require('../models/user_model');
class ManagementController{
    // method: post
    // path: /management
    // params: ...
    async create(req, res, next) {
        // 檢查使用者是否有權限。
        if (req.session.uid) {
            /*
            muser.findOne( {account: req.session.uid})
            .then( function(result) {
                if (!result.is_admin) {
                    return res.json( {success: false, message: '您並不是管理員。'} );
                }
            })*/
        }else{
            return res.json( {success: false, message: '您尚未登入。'} );
        }
        
        // 檢查欄位是否正確
        checkCreateColumnsAreValid(req, res, next, "居家檢疫");
        
        // 開始插入資料到 MySQL。
        try{
            let createIsolator = await managementModel.createIsolators(req.body);
            let createIsolation = await managementModel.createIsolation(req.body, createIsolator.isolatorInsertedId);
            let createTravelCountry = await managementModel.createTravelCountry(req.body, createIsolator.isolatorInsertedId);
            await managementModel.add_mailing_address_geolocations(req.body, createIsolator.isolatorInsertedId);
            return res.json( {success: true, isolatorId: createIsolator.isolatorInsertedId} );
        }
        catch(e){
            /*
                如果新增失敗，把所有關聯全部刪掉，並返回使用者錯誤資訊。
                機會較少，除非有BUG，或資料庫突然斷開，以後再打。
            */
            return res.json( {success: false, message: '資料插入時發生錯誤。'} );
        }
    }

    async getAllIsolatorInfo(req, res, next){
        let getAllIsolators = await managementModel.getAllIsolators();
        let getAllIsolations = await managementModel.getAllIsolations();
        let getAllTravelCountries = await managementModel.getAllTravelCountries();
        let getAllGeolocations = await managementModel.getAllGeolocations();
        // 進行資料處理
        let data = getAllIsolators.map( (isolatorItem, isolatorIndex, isolatorArray) => {
            let isolationData = {};
            let travelContries = [];
            getAllIsolations.forEach( (isolationItem, isolationIndex, isolationArray) => {
                if (isolatorItem.id === isolationItem.isolator_id ){
                    isolationData = isolationItem;
                }
            })

            getAllTravelCountries.forEach( (travelCountryItem, travelCountryIndex, travelCountryArray) => {
                if (isolatorItem.id === travelCountryItem.isolator_id ){
                    travelContries.push(travelCountryItem.country_name);
                }
            })
            
            getAllGeolocations.forEach( (geoLocationItem, geoLocationIndex, geoLocationArray) => {
                if (isolatorItem.id === geoLocationItem.isolator_id ){
                    isolatorItem.latitude = geoLocationItem.latitude;
                    isolatorItem.longitude = geoLocationItem.longitude;
                }
            })
            return {
                ...isolatorItem,
                isolationData,
                countries: travelContries
            }
        })
        return res.send(data);
    }
    async getAllSymptomTypes(req, res, next){
        let allSymptomTypes = await managementModel.getAllSymptomTypes();
        res.send(allSymptomTypes);
    }

    async addHealthStatus(req, res, next){
        try{
            let { healthStatusID } = await managementModel.createHealthStatus(req.body);
            if (req.body.symptomTypes.length > 0){
                await managementModel.addToHealthSymptoms(req.body, healthStatusID);
            }
            return res.send({
                success: true,
            })
        }
        catch(e){
            return res.send({
                success: false,
                message: '資料插入失敗。',
            })
            /*
                如果新增失敗，把所有關聯全部刪掉，並返回使用者錯誤資訊。
                機會較少，除非有BUG，或資料庫突然斷開，以後再打。
            */
        }
    }
    async getHealthStatusById (req, res, next) {
        //先取得 health status
        //再取得 symptoms 跟
        let id = req.query.isolator_id;
        let data = await managementModel.getHealthStatus(id);
        return res.send(data);
    }
}

function checkCreateColumnsAreValid(req, res, next, _type){
    if ( !(req.body.name.length >= 2) ){
        return res.json( {success: false, message: '姓名長度必須大於等於2。'} );
    }
    if ( !(Number(req.body.age) >= 0 &&  Number(req.body.age) <= 130) ){
        return res.json( {success: false, message: '年齡請輸入在0~130之間。'} );
    }
    if ( req.body.passport.length < 1 ){
        return res.json( {success: false, message: '請輸入護照號碼。'} ); // 隔離並不一定要護照號碼
    }
    if ( req.body.gender != 1 && req.body.gender != 2){
        return res.json( {success: false, message: '請輸入正確性別。'} );
    }
    if ( !req.body.birthday || req.body.birthday == ""){
        return res.json( {success: false, message: '請選擇正確的生日。'} );
    }
    if ( !req.body.mailing_address || req.body.mailing_address == ""){
        return res.json( {success: false, message: '通訊地址為必填欄位。'} );
    }
    if ( !req.body.phone || req.body.phone == ""){
        return res.json( {success: false, message: '請填入聯絡電話。'} );
    }
    if ( !req.body.departure_date || req.body.departure_date == "" ){
        return res.json( {success: false, message: '請填入出境日期。'} ); // 隔離並不用出境日期
    }
    if ( req.body.entry_date == "" || !req.body.entry_date){
        return res.json( {success: false, message: '請填入入境日期。'} ); // 隔離並不用入境日期
    }
    if ( req.body.selected_country_names.length < 1 ){
        return res.json( {success: false, message: '請選擇近期去過的國家。'} ); //隔離並不用去過國家
    }
    if ( !req.body.start_date || req.body.start_date == "" ){
        return res.json( {success: false, message: `請輸入${_type}起始日。`} );
    }
    if ( !req.body.end_date || req.body.end_date == "" ){
        return res.json( {success: false, message: `請輸入${_type}結束日。`} );
    }
    if ( !req.body.days || req.body.days == 0 ){
        return res.json( {success: false, message: `請輸入${_type}正確的天數。`} );
    }
    if ( ! (req.body.isolation_type_id > 0) ){
        return res.json( {success: false, message: `請輸入類別（居家檢疫/居家隔離/自主健康管理）。`} );
    }
}

module.exports = ManagementController;