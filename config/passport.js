var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/User');

module.exports = function (app, passport, facebookConfig) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user for the session
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },

            function (req, username, password, done) {
                process.nextTick(function () {
                    User.findOne({
                        username: username
                    }, function (err, user) {
                        if (err)
                            return done(err);

                        var newUser = new User();
                        newUser.username = username;
                        newUser.hash(password);
                        newUser.email = req.body.email;
                        
                        newUser.save(function (err) {
                            if (err)
                                next(err);
                            return done(null, newUser);
                        });
                    });
                });
            }
        ));

    passport.use('local-signin',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },

            function (req, username, password, done) {
                User.findOne({
                    username: username
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            }
        ));
};