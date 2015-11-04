# ql-stats-api
Is an RESTful JSON only API that exposes data processed and persisted by the [ql-stats-engine](https://github.com/swallentin/ql-stats-engine)

# Implemented routes
* GET /players - Lists all players
* GET /players/online - List all players connected to a server
* GET /player/:steamid - Get a player by steam id
* GET /matches - Returns all matches
* GET /matches/current - Returns all current running matches
* GET /match/:match_guid - Returns a match by it’s guid.


# Upcoming changes
* GET /servers
* GET /server/:id
* GET /player/:steamid - Updated with support for ELO for duel (other game types will are planned but needs to be cared for more carefully)
* GET /player/:id/matches/ - Get player matches
* All routes that returns lists will be capped to only return 10 games per page and introduce pagination through querystring parameters. It will also return games order by date in descending order, from latest to oldest.

# Examples
Currently these only report players playing on the Arte et Marte servers. See this [file](https://github.com/swallentin/ql-stats-engine/blob/master/config/default.json) for complete list of servers.
If you’d like to add your server to this list, fork and pull request the [ql-stats-engine](https://github.com/swallentin/ql-stats-engine) repository.
* [http://api.topdog.io/players](http://api.topdog.io/players) 
* [http://api.topdog.io/players/online](http://api.topdog.io/players/online)
* [http://api.topdog.io/player/76561198175362126](http://api.topdog.io/player/76561198175362126)
* [http://api.topdog.io/matches](http://api.topdog.io/matches) 
* [http://api.topdog.io/matches/current](http://api.topdog.io/matches/current) 
* [http://api.topdog.io/match/bc6e91e1-9ebf-4087-81c7-5b521eb4e75d](http://api.topdog.io/match/bc6e91e1-9ebf-4087-81c7-5b521eb4e75d)

