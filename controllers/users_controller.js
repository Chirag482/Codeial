const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("ERROR MULTER", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          user.avatar = User.avatar_path + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//rendering sign up page
module.exports.singUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "codeial | sign up",
  });
};

//rednering sign in page
module.exports.singIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "codeial | sign in",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/profile");
      });
    } else {
      console.log("Email is used before");
      return res.redirect("back");
    }
  });
};

// sign in and creating a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You have logged out!");
  return res.redirect("/");
};
