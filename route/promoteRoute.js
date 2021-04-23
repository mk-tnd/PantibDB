const express = require("express");
const userController = require("../controllers/userController");
const promoteController = require("../controllers/promoteController");

const router = express.Router();

router.patch("/like/:PostId", userController.protect, promoteController.like);
router.get("/", userController.protect, promoteController.getAllUserlike);

module.exports = router;
