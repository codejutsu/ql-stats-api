var restify = require('restify'),
    Routes = require('./routes/index.js'),
    server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());

module.exports = function(redisClient, config) {
    console.log('starting server', config);
    Routes.register(server, redisClient, config);
    return server;
};
