function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function samePassword(pw1, pw2){
    if (pw1 === pw2){
        return true;
    }
    else{
        return false;
    }
}

function wordCountLimit(str, min, max){
    if ( str.length >= min && str.length <= max ){
        return true;
    }else{
        return false;
    }
}

function justInputEngorNum(str){
    var charArray = ["a","b","c","d","e",
    "f","g","h","i","j","k","l","m","n"
    ,"o","p","q","r","s","t","u","v","w","x","y","z",
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    ".","_",
    "0","1","2","3","4","5","6","7","8","9"
    ];

    for (var i = 0; i < str.length; i++){
        var con = 0;
        for(var j = 0; j < charArray.length; j++){
            if( str.substring(i, i+1) == charArray[j] ){
                con ++;
            }
        }
        if (con == 0){
            return false;
        }
    }
    return true;
}

function atLeastUpper(str, count){
    var charArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
    
    var c = 0;
    for (var i = 0; i < str.length; i++){
        for (var j = 0; j < charArray.length; j++){
            if ( str.substring(i, i+1) == charArray[j]){
                c ++;
            }
        }
    }
    if (c >= count){
        return true;
    }
    return false;
}

function atLeastLower(str, count){
    var charArray = ["a","b","c","d","e",
    "f","g","h","i","j","k","l","m","n"
    ,"o","p","q","r","s","t","u","v","w","x","y","z",];
    
    var c = 0;
    for (var i = 0; i < str.length; i++){
        for (var j = 0; j < charArray.length; j++){
            if ( str.substring(i, i+1) == charArray[j]){
                c ++;
            }
        }
    }
    if (c >= count){
        return true;
    }
    return false;
}

function atLeastEnglish(str, count){
    var charArray = ["a","b","c","d","e",
    "f","g","h","i","j","k","l","m","n"
    ,"o","p","q","r","s","t","u","v","w","x","y","z",
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",]
    var c = 0;
    for (var i = 0; i < str.length; i++){
        for (var j = 0; j < charArray.length; j++){
            if ( str.substring(i, i+1) == charArray[j]){
                c ++;
            }
        }
    }
    if (c >= count){
        return true;
    }
    return false;
}

module.exports = {
    validateEmail,//信箱格式是否正確
    samePassword,//密碼是否一致
    wordCountLimit,//字串長度限制
    justInputEngorNum,//字串內僅能有英語或數字和 [.] [_] 
    atLeastUpper,//最少要有幾個大寫英文字
    atLeastLower,//最少要有幾個小寫英文字
    atLeastEnglish//最少要有幾個英文
}