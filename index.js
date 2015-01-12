/**
 * Created by Gerd on 04.01.2015.
 */
var model = require('./storage_model').storage_model;

if(global.storage_model === undefined){
    global.storage_model = new model();
}

function setData(key, value){
    global.storage_model[key] = value;
    return value;
}

/**
 * Get cached data, if callback was sent and value by key is undefined then using callback as for setData
 * @param key
 * @param callback
 * @returns {*}
 */
function getData(key, callback){

    var value = global.storage_model[key];
    if(value == undefined && callback)
    {
       value = this.setData(key, callback());
    }

    return value;
}

function clearData (key){
    delete global.storage_model[key];
}


function clearAllData (){
    global.storage_model = new model();
}

exports.setData = setData;
exports.getData = getData;
exports.clearData = clearData;
exports.clearAllData = clearAllData;
