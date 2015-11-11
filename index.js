var config = require('config'),
    settings = config.get('settings'),
    redis = require('redis'),
    Server = require('./lib/server'),
    redisClient = redis.createClient(),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/ql-stats';

redisClient.on('ready', function() {

    MongoClient.connect(url, function (err, db) {
        var server = Server.create(redisClient, db, settings);

        server.listen(settings.server.port, settings.server.host, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('%s listening at %s', settings.server.host, settings.server.port);
        });

    });

});


