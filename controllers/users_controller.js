module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

//rendering sign up page
module.exports.singUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "codeial | sign up",
  });
};

//rednering sign in page
module.exports.singIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "codeial | sign in",
  });
};
