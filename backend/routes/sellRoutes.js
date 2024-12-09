const express = require("express");
const { insertSellItem, getSellItems } = require("../controllers/sellController");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.post("/insertNewSell", upload.single("image"), insertSellItem);
router.get("/readSellItems", getSellItems);

module.exports = router;
