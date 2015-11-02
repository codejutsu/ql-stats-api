module.exports = function (redis, config) {
    return {
        GET_byMatchGUID: function (req, res, next) {
            redis.hgetall('match:' + req.params.matchid, function (err, result) {
                if(err) {
                    res.send({});
                    return next();
                }
                res.send(result);
                return next;
            });
        },
        GET_all: function (req, res, next) {
            redis.smembers('matches', function (err, matches) {
                res.json(matches);
                return next();
            });
        },
        GET_current: function (req, res, next) {
            redis.smembers('current_matches', function (err, matches) {
                res.json(matches);
                return next();
            });
        }
    };
};
