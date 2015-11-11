module.exports = {
    register: function (router, passport, redis, mongo, config) {

        var player = require('./player.js')(redis, mongo, config),
            match = require('./match.js')(redis, mongo, config),
            steam = require('./steam')(passport, config),
            requireAuthentication = require('../middleware/require-authentication')(config);

        router.get('/', function(req, res, next) {
            if(req.isAuthenticated()) {
                res.json(req.user);
            } else {
                res.send('Not logged in!');
            }
            return next();
        });


        router.route(config.routes.authentication.authenticate)
                .get(steam.GET_Auth);

        router.route(config.routes.authentication.callback)
                .get(steam.GET_AuthCallback);

        router.route(config.routes.authentication.logout)
                .get(function (req, res, next) {
                    req.logout();
                    res.redirect(config.routes.start);
                    next();
                });

        router.route('/player/:steamid')
                .get(requireAuthentication, player.GET_bySteamId);

        router.route('/players')
                .get(requireAuthentication, player.GET_all);

        router.route('/players/online')
                .get(requireAuthentication, player.GET_online);


        router.route('/match/:matchid')
                .get(requireAuthentication, match.GET_byMatchGUID);

        router.route('/matches')
                .get(requireAuthentication, match.GET_all);

        router.route('/matches/current')
                .get(requireAuthentication, match.GET_current);

    }
};
