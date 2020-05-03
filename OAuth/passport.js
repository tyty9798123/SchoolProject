var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,

        clientSecret: process.env.FB_CLIENT_SECRET,

        callbackURL: process.env.FB_CALLBACK_URL,
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