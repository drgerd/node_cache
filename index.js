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
 * @param valueObj - if valueObj is Function then this is async callback, if valueObj is object the this it will be set as value imediatley
 * @returns {*}
 */

//cache.getData("module",parsePages(function (moduledata){
//    return moduledata
//}), function(value){res.json(value);});
//
//cache.getData("module",function(callbackSetter){parsePages(function (moduledata){
//    res.json(moduledata);
//    callbackSetter(moduledata)
//})});

function getData(key, valueObj, callback){

    var value = global.storage_model[key];
    if(value == undefined && valueObj)
    {

        if(valueObj instanceof Function){
            valueObj(function(cbck_value){
                this.setData(key, cbck_value);
                value = cbck_value
            }.bind(this));
        }
        else if(valueObj instanceof Object){
            value = valueObj;
            this.setData(key, valueObj);
        }
        else{
            value = undefined;
            this.setData(key, value);
        }


//       if(value == undefined){
//           if(callback && callback instanceof Function){
//               callback(undefined);
//           }
//           return undefined;
//       }
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
