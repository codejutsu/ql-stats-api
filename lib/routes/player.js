module.exports = function (redis, config) {
    return {
        GET_online: function (req, res, next) {
            redis.smembers('online_players', function (err, players) {
                res.json(players);
                return next();
            });
        },
        GET_all: function (req, res, next) {
            redis.smembers('players', function (err, players) {
                res.json(players);
                return next();
            });
        },
        GET_bySteamId: function (req, res, next) {
            redis.hgetall('user:' + req.params.steamid, function (err, result) {
                res.send(result);
                return next;
            });
        }
    };
};
