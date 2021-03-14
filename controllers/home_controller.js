const Post = require("../models/post");

module.exports.home = function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      console.log("error in finding posts from database");
      return;
    }

    return res.render("home", {
      title: "home",
      posts: posts,
    });
  });
};
