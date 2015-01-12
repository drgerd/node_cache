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
function getData(key, valueObj, callback){

    var value = global.storage_model[key];
    if(value == undefined && valueObj)
    {
        value = valueObj instanceof Function
            ? valueObj()
            : valueObj instanceof Object
                ? valueObj
                : undefined;

       if(value == undefined){
           if(callback && callback instanceof Function){
               callback(undefined);
           }
           return undefined;
       }
       this.setData(key, value);
    }

    if(callback && callback instanceof Function){
        callback(value);
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
