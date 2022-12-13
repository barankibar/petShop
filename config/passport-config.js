const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, same) => {
          if (!user || !same) {
            return done(null, false, {
              errors: { "email or password": "is invalid " },
            });
          }
          console.log(user);
          return done(null, user);
        });
      })
      .catch(done);
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth/redirect/google",
      scope: ["profile"],
    },
    asyncHandler(async (accessToken, refreshToken, profile, done) => {
      console.log("user profile is: ", profile);
      return done(null, profile);
    })
  )
);
