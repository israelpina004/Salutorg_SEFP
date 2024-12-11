const express = require("express");
const { insertRentItem, getRentItems } = require("../controllers/rentController");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.post("/insert", upload.single("url"), insertRentItem);
router.get("/readRentItems", getRentItems);

module.exports = router;
