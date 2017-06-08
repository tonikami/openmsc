var router = require('express').Router();

var User = require('../models/User');

module.exports = function (app, passport) {
    // route for logging out user
    app.get("/auth/logout", function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth/login',
        passport.authenticate('local-signin', {
            failureRedirect: '/auth/failureCallback'
        }),
        function (req, res) {
            res.json(req.user);
        });

    app.get('/auth/failureCallback', function (req, res) {
        res.json({});
    });

    app.post('/auth/signup',
        passport.authenticate('local-signup'),
        function (req, res) {
            res.json(req.user);
        });
}