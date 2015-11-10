module.exports = {
    register: function (router, redis, mongo, config) {

        var player = require('./player.js')(redis, mongo, config),
            match = require('./match.js')(redis, mongo, config);

        router.get('/', function(req, res, next) {
            res.send('/players /players/online /player/:steamid /matches /matches/current /match/:match_guid');
            return next();
        });


        router.route('/player/:steamid')
                .get(player.GET_bySteamId);

        router.route('/players')
                .get(player.GET_all);

        router.route('/players/online')
                .get(player.GET_online);


        router.route('/match/:matchid')
                .get(match.GET_byMatchGUID);

        router.route('/matches')
                .get(match.GET_all);

        router.route('/matches/current')
                .get(match.GET_current);

    }
};
