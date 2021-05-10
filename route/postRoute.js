const express = require("express");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/mypost", userController.protect, postController.getAllMyPosts);
router.get("/recpost", postController.getRecPosts);
router.get("/toppost", postController.getTopPosts);
router.get("/:postId", postController.getPost);
router.post("/", userController.protect, postController.createPost);
router.delete("/:id", userController.protect, postController.deletePost);

module.exports = router;
