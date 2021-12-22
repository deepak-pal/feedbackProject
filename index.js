const express = require('express');
const mongosse = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
//const { MongoClient } = require('mongodb');
const key = require('./config/key');
require('./models/Users')
require('./services/passport');
mongosse.connect(key.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [key.cookieKey, key.cookieSecokey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);