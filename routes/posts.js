const express = require("express");
const { post } = require(".");
const router = express.Router();

const PostsController = require("../controllers/posts_controller");

router.post("/create", PostsController.create);

module.exports = router;