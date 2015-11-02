var config = require('config'),
    apiConfig = config.get('api'),
    redis = require('redis'),
    redisClient = redis.createClient(),
    server = require('./lib/server')(redisClient, apiConfig);

server.listen(apiConfig.server.port, apiConfig.server.host, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('%s listening at %s', server.name, server.url);
});
