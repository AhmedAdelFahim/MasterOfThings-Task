const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
require('./db/connection')
const cors = require("cors");
const session = require('express-session');
const redisClient = require('./db/redis')
const redisStore = require('connect-redis')(session);

const PORT = process.env.PORT || 5000;

const app = express();

redisClient.client.on('error', (err) => {
    console.log('Redis error: ', err);
});

let corsOptions = {
    origin: `http://localhost:${process.env.CLIENT_PORT}`
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new redisStore({ host: '0.0.0.0', port: 6379, client: redisClient.client, ttl: 3600 }),
}));

app.use('/auth', authRouter)
app.use('/users', userRouter)

// middleware that logs requests method and the url requested.
app.use((req, res, next) => {
    let date = new Date().toISOString().split('T');
    console.log(`\n\n${date[0]} ${date[1]}`);
    console.log(`new request, its method: ${req.method}`);
    console.log(`the url requested: ${req.url}\n`);
    next();
});

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
});

// Initiating the Server
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`App Started on port: ${PORT}`);
    }

});

module.exports = app

