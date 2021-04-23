const express = require("express");
const zoneController = require("../controllers/zoneController");

const router = express.Router();

router.get("/", zoneController.getAllZone);

module.exports = router;
