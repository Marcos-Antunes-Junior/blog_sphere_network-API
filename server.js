const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passportSetup = require("./config/passportSetup");
const passport = require("passport");
const env = require("dotenv");
const db = require("./models");
const session = require("express-session");
const cors = require('cors');
const static = require('./routes/static')

const port = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);

/* Authentication using Google Oauth2.0 with Passport.js */
app.use(passport.initialize());
app.use(passport.session());

/* SERVER CONFIG */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use CORS middleware here
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));

/* Serve profile pictures */
app.use(static);

/* ROUTES */
app.use("/", require("./routes"));


/* DATABASE */
db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected and server running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/* Export app module for unit test (jest) */
module.exports = app;
