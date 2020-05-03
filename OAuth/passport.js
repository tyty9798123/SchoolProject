var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
        clientID: 855816091295775,

        clientSecret: "3cc27d568ccd2ab083461ba962ecc3fd",

        callbackURL: "http://localhost:3000/auth/facebook/callback",
	//callbackURL: "http://localhost:3030/auth/facebook/callback",
        profileFields: ['id', 'email', 'displayName', 'photos']
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


passport.serializeUser(function (user, cb) {

    cb(null, user);

});
passport.deserializeUser(function (obj, cb) {

    cb(null, obj);

});


module.exports = passport;