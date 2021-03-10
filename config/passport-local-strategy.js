const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user-->passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid password and username");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing he user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("erroe in finding user while deserializing");
      return done(err);
    }
    return done(null, user);
  });
});

//to show the profile of current user
//1)check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then pass on the request to the next function i.e. controllers action
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;