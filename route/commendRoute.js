const express = require("express");
const commendController = require("../controllers/commendController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:postId", commendController.getAllCommend);
router.post(
  "/:postId",
  userController.protect,
  commendController.createCommend
);

module.exports = router;
