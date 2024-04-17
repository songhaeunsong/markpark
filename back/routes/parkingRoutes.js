const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController.js");

router.get("/parking", parkingController.getParkings);

module.exports = router;
