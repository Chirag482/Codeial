const express = require("express");
const { post } = require(".");
const router = express.Router();
const passport = require("passport");

const CommentsController = require("../controllers/comments_controller");

router.post("/create", passport.checkAuthentication, CommentsController.create);

module.exports = router;
