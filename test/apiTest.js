/**
 * Created by Gerd on 08.01.2015.
 */

/**
 * Created by Heorhi_Vilkitski on 1/9/2015.
 */
var assert = require('assert');
var Q = require('q');
var Storage_model = require('../storage_model').storage_model;

suite('Api node_cache', function(){


    suite('SetData API',function(){
        test('Set/Get simple object', function(){
            var key = "Set simple object key, should return the same object";
            var value = {test:"test"};
            var node_cache_instance = require('../index');
            node_cache_instance.setData(key,value)

            assert.equal(node_cache_instance.getData(key), value);
            assert.equal(node_cache_instance.getData(key).test, value.test);
        });


        test('Two times Set/Get simple object, shouldnt override any value by key', function(){
            var key = "key1";
            var key2 = "key2";
            var value = {test:"test"};
            var value2 = {test:"test2"};
            var node_cache_instance = require('../index');
            node_cache_instance.setData(key,value);

            node_cache_instance.setData(key2,value2);

            assert.equal(node_cache_instance.getData(key), value);
            assert.equal(node_cache_instance.getData(key).test, value.test);
            assert.equal(node_cache_instance.getData(key2), value2);
            assert.equal(node_cache_instance.getData(key2).test, value2.test);

        });

        test('Set/Clear/Get simple object, should return undefined', function(){
            var key = "Set simple object key";
            var value = {test:"test"};
            var node_cache_instance = require('../index');

            node_cache_instance.setData(key,value)
            node_cache_instance.clearData(key);

            assert.strictEqual(node_cache_instance.getData(key), undefined);
        });

        test('Tow Set then ClearAll/Get simple object, should return undefined', function(){
            var key = "key1";
            var key2 = "key2";
            var value = {test:"test"};
            var value2 = {test:"test2"};
            var node_cache_instance = require('../index');

            node_cache_instance.setData(key,value);
            node_cache_instance.setData(key2,value2);

            node_cache_instance.clearAllData();

            assert.strictEqual(node_cache_instance.getData(key), undefined);
            assert.strictEqual(node_cache_instance.getData(key2), undefined);
        });


        test("GetData method cache hasn't value by key => callbackObj for setData should be run ", function(){
            var key = "key";
            var value = {test:"test"};
            var asserts = 0;

           // var deferred = Q.defer();

            var callbackForValue = function(callbackSetter){
                callbackSetter(value);
            };


            var node_cache_instance = require('../index');


//            deferred
//             node_cache_instance.getData(key, callbackForValue)

            assert.strictEqual(node_cache_instance.getData(key, callbackForValue), value);

            // check clearData and callback
            node_cache_instance.clearData(key);
            assert.strictEqual(node_cache_instance.getData(key, callbackForValue), value);

            // check if callback is undefined
            node_cache_instance.clearData(key);
            assert.strictEqual(node_cache_instance.getData(key), undefined);

        });


        test("GetData method using callback for Async and Object as setterObj", function(){
            var key = "key";
            var value = {test:"test"};

            var return_obj;

            var node_cache_instance = require('../index');

            assert.strictEqual(node_cache_instance.getData(key, value, function(result){return_obj = result;}), value);
            assert.strictEqual(value, return_obj);

        });

//        test.ignore('Set simple object2', function(){
//            console.log(node_cache_instance.getData());
//        })
    })

})