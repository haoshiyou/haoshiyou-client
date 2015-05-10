/**
 * Global cache using Parse and local storage
 */
var ParseJsGlobalCache = (function(zHelper, Parse/*initiated before call*/){

    var CONST_CACHE_KEY_COLUMN_NAME = "CACHE_KEY";
    var CONST_CACHE_VALUE_COLUMN_NAME = "CACHE_VALUE";

    var CONST_CACHE_EXPIRE_AT_COLUMN_NAME = "CACHE_EXPIRE_AT";
    var CacheDb = function(parseDbName, expireInAdvanceMilli){
        zHelper.assert(parseDbName);
        zHelper.log("XXX parseDbName:" + parseDbName);
        this.expireInAdvanceMilli_ = expireInAdvanceMilli;
        this.parseDbName_ = parseDbName;
        this.parseDbClass_  = Parse.Object.extend(parseDbName);

        // Schema
        // key: key
        // value: value
        // expire_at: timestamp in unix time milli, in Date()
    };

    CacheDb.prototype.cacheReadAsync = function(key, cb) {
        var query = new Parse.Query(this.parseDbClass_);
        var that = this;
        query.equalTo(CONST_CACHE_KEY_COLUMN_NAME, key);
        query.limit(1);
        query.find().then(function(results){
            if (results.length === 0) {
                return null;
            } else {
                zHelper.assert(results.length == 1);
                var cachedObj = results[0];
                var now = Date.now();

                zHelper.log("now = " + now);
                if (now <= (cachedObj.get(CONST_CACHE_EXPIRE_AT_COLUMN_NAME) - that.expireInAdvanceMilli_)) {
                    zHelper.log("cache hit");
                    var value = cachedObj.get(CONST_CACHE_VALUE_COLUMN_NAME);
                    return value;
                } else {
                    zHelper.log("cache expired, expire_at = " + cachedObj.get(CONST_CACHE_EXPIRE_AT_COLUMN_NAME));

                    zHelper.log("cache expired, expire in advance = " + cachedObj.get(CONST_CACHE_EXPIRE_AT_COLUMN_NAME)) - that.expireInAdvanceMilli_;

                    return null;
                }
            }
            return null;
        }).then(function(value){
            cb(value);
        }).fail(function(error){
            // error is an instance of Parse.Error.
            zHelper.log("Cached request error", zHelper.LOG_LEVELS.DEBUG, error);
            return null;
        });
    };

    CacheDb.prototype.cacheWriteAsync = function (key, value, timeToExpireMilli, cb) {
        var that = this;
        zHelper.assert(key, "key should exist");
        zHelper.assert(value, "value should exist");
        zHelper.assert(timeToExpireMilli, "timeToExpireMilli should exist");
        this.cacheReadAsync(key, function(data) {
            zHelper.log("cacheWriteAsync data !== null ->" +(data !== null));
            var cacheObj = data !== null ? data : new Parse.Object(that.parseDbName_);
            cacheObj.set(CONST_CACHE_KEY_COLUMN_NAME, key);
            cacheObj.set(CONST_CACHE_VALUE_COLUMN_NAME, value);
            cacheObj.set(CONST_CACHE_EXPIRE_AT_COLUMN_NAME, Date.now() + timeToExpireMilli);
            cacheObj.save()
                .then(function(){
                    cb();
                }).fail(function(ret){
                    zHelper.log("cache write failed", zHelper.LOG_LEVELS.ERROR, ret);
                });
        });
    };
    return {
        CacheDb : CacheDb
    };
})(zHelper, Parse);