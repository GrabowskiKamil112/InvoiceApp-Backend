const mongoose = require("mongoose");
const passport = require("passport");
require("../models/User");

const User = mongoose.model("users");

const user = {
  userLogin: (req, res, next) => {console.log('login',req);
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(403);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        console.log(`user id: ${user}`);
        return res.send(user);
      });
    })(req, res, next);
  },

  userLogout: (req, res) => {
    console.log("succesfully logged out");

    req.logout();
    res.sendStatus(200);
  },

  userRegister: (req, res) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        } else {
          passport.authenticate("local")(req, res, function () {
            res.send({ _id: req.user.id, username: req.user.username });
          });
        }
      }
    );
  },
};

module.exports = user;
