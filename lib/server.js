var restify = require('restify'),
    Routes = require('./routes/index.js');


exports.create = function(redis, mongo, config) {
    var server = restify.createServer();
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    console.log('starting server', config);
    Routes.register(server, redis, mongo, config);
    return server;
};
