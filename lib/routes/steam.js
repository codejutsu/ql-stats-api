module.exports = function (passport, config) {
    return {
        GET_Auth: passport.authenticate('steam'),
        GET_AuthCallback: passport.authenticate('steam', {
            failureRedirect: '/login',
            successRedirect: '/'
        })
    }
};