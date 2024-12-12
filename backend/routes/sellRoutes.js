const express = require("express");
const { insertSellItem, getSellItems, placeBid } = require("../controllers/sellController");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.post("/insertNewSell", upload.single("image"), insertSellItem);
router.get("/readSellItems", getSellItems);

// Route for placing bids
router.post("/placeBid", placeBid); // Add the route for placing bids

module.exports = router;
