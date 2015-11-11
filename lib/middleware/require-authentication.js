module.exports = function (config) {
    return function requireAuth(req, res, next) {
        // check if the user is logged in
        if(!req.isAuthenticated()){
            req.session.authenticationRedirectUrl = req.originalUrl;
            res.redirect(config.routes.authentication.authenticate);
        }
        next();
    };
};