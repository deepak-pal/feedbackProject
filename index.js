const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express();
const keys = require('./config/key')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecretKey,
    callbackURL: '/auth/google/callback'
}, (accesToken, refreshToken, profile, done) => {
    console.log("Access Token \\n Refresh Token \\n Profile", accesToken, refreshToken, profile);
}))

app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000;
app.listen(PORT);