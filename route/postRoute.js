const express = require("express");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/mypost", userController.protect, postController.getAllMyPosts);
router.post("/", userController.protect, postController.createPost);

module.exports = router;
