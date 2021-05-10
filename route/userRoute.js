const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/me", userController.protect, userController.me);
router.patch("/edit", userController.protect, userController.updateUser);
router.patch("/editImg", userController.protect, userController.updateUserImg);

module.exports = router;
