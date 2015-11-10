var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    Routes = require('./routes/index.js');


exports.create = function(redis, mongo, config) {
    Routes.register(router, redis, mongo, config);

    var server = express();
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(router);
    return server;
};
