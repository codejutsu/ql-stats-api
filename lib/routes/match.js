module.exports = function (redis, mongo, config) {
	var _matches = mongo.collection("matches"),
		_playerstats = mongo.collection("player_stats");

	return {

		// TODO: Fix this, we can't have the server performing queries gainst player_stats, map match_guid's and query the database again for match information
		GET_bySteamId: function (req, res, next) {
			_playerstats.find({"DATA.STEAM_ID": req.params.steamid}, {"DATA.MATCH_GUID": 1})
				.toArray(function (err, documents) {
					if (err) {
						return next(err);
					}

					_matches.find({
							"DATA.MATCH_GUID": {
								$in: documents.map(function (a) {
									return a.DATA.MATCH_GUID;
								})
							}
						})
						.toArray(function (err, documents) {
							if (err) {
								return next(err);
							}

							res.json(documents || []);
							return next();
						});
				});
		},
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

				_matches.find({"DATA.MATCH_GUID": {$in: matchIds}})
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

				_matches.find({"DATA.MATCH_GUID": {$in: matchIds}})
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
