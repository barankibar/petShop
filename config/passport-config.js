const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

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
