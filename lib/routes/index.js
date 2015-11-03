module.exports = {
    register: function (server, redis, mongo, config) {

        var player = require('./player.js')(redis, mongo, config),
            match = require('./match.js')(redis, mongo, config);

        server.get('/', function(req, res, next) {
            res.send(200);
            return next();
        });

        server.get('/players/online', player.GET_online);
        server.get('/players', player.GET_all);
        server.get('/player/:steamid', player.GET_bySteamId);

        server.get('/match/:matchid', match.GET_byMatchGUID);
        server.get('/matches', match.GET_all);
        server.get('/matches/current', match.GET_current);

    }
};
