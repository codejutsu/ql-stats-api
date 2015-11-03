module.exports = function (redis, mongo, config) {
    var _matches = mongo.collection("matches");

    return {
        GET_byMatchGUID: function (req, res, next) {
            _matches.findOne({"DATA.MATCH_GUID": req.params.matchid}, function (err, document) {
                if (err) {
                    return next(err);
                }

                res.json(document || {});
                return next();
            });
        },
        GET_all: function (req, res, next) {
            redis.smembers('matches', function (err, matchIds) {
                if (err) {
                    return next(err);
                }

                _matches.find({"DATA.MATCH_GUID": {$in: matchIds} })
                        .toArray(function (err, documents) {
                            if (err) {
                                return next(err);
                            }

                            res.json(documents || []);
                            return next();
                        });
            });
        },
        GET_current: function (req, res, next) {
            redis.smembers('current_matches', function (err, matchIds) {
                if (err) {
                    return next(err);
                }

                _matches.find({"DATA.MATCH_GUID": {$in: matchIds} })
                        .toArray(function (err, documents) {
                            if (err) {
                                return next(err);
                            }

                            res.json(documents || []);
                            return next();
                        });
            });
        }
    };
};
