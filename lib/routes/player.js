module.exports = function (redis, mongo, config) {
    var players = mongo.collection("players");
    return {
        GET_online: function (req, res, next) {
            redis.smembers('online_players', function (err, steamIds) {
                if (err) {
                    return next(err);
                }

                players.find({"DATA.STEAM_ID": {$in: steamIds} })
                    .toArray( function(err, documents) {
                        if (err) {
                            return next(err);
                        }

                        res.json(documents || []);
                        return next();
                    });
            });
        },
        GET_all: function (req, res, next) {
            redis.smembers('players', function (err, steamIds) {
                if (err) {
                    return next(err);
                }

                players.find({"DATA.STEAM_ID": {$in: steamIds} })
                        .toArray(function(err, documents) {
                            if (err) {
                                return next(err);
                            }

                            res.json(documents || []);
                            return next();
                        });
            });
        },
        GET_bySteamId: function (req, res, next) {
            players.findOne({"DATA.STEAM_ID": req.params.steamid }, function(err, document) {
                if (err) {
                    return next(err);
                }
                res.json(document || {});
                return next();
            });
        }
    };
};
