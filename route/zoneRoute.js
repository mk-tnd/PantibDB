const express = require("express");
const zoneController = require("../controllers/zoneController");

const router = express.Router();

router.get("/", zoneController.getAllZone);
router.get(`/postzone/:zid`, zoneController.getAllPostInZone);

module.exports = router;
