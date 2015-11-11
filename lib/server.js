var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    SteamStrategy = require('passport-steam').Strategy,
    RedisStore = require('connect-redis')(session),
    Routes = require('./routes/index.js'),
    router = express.Router();


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});



exports.create = function(redis, mongo, config) {

    passport.use(new SteamStrategy(config.steam, function(identifier, profile, done) {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.

        // TODO: Fetch user from redis
        profile.identifier = identifier;
        return done(null, profile);
    }));

    Routes.register(router, passport, redis, mongo, config);

    var server = express();
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(bodyParser.json());
    server.use(session({
        store: new RedisStore(),
        secret: config.session.secret
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(router);

    return server;
};
