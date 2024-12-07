const express = require("express");
const { insertSellItem, getSellItems } = require("../controllers/sellController");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.post("/insert", upload.single("url"), insertSellItem);
router.get("/readSellItems", getSellItems);

module.exports = router;
