const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const env = require("dotenv").config();
const db = require("../models");
const GoogleUser = db.googleUser;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/redirect",
    },
    (req, accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      GoogleUser.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User is: " + currentUser);
          console.log(profile);
          done(null, currentUser);
        } else {
          new GoogleUser({
            username: profile.displayName,
            googleId: profile.id,
            picture: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("New user created " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
