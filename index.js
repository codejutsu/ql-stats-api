var config = require('config'),
    apiConfig = config.get('api'),
    redis = require('redis'),
    Server = require('./lib/server'),
    redisClient = redis.createClient(),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/ql-stats';

redisClient.on('ready', function() {

    MongoClient.connect(url, function (err, db) {
        var server = Server.create(redisClient, db, apiConfig);

        server.listen(apiConfig.server.port, apiConfig.server.host, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('%s listening at %s', apiConfig.server.host, apiConfig.server.port);
        });

    });

});


