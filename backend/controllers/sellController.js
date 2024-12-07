const db = require("../models/db");

const insertSellItem = (req, res) => {
  const { name, startPrice, condition, category, deadline, description } = req.body;
  const url = req.file;

  if (!name || !startPrice || !condition || !category || !deadline || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO sell_item (name, starting_price, `condition`, category, deadline, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, startPrice, condition, category, deadline, description, url.buffer];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    res.status(200).json({ message: "Data inserted successfully", result });
  });
};

const getSellItems = (req, res) => {
  const sql = "SELECT * FROM sell_item";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Failed to fetch items" });
    }

    const itemsWithBase64 = results.map((item) => {
      if (item.image) {
        item.image = item.image.toString("base64");
      }
      return item;
    });

    res.status(200).json({
      message: itemsWithBase64.length === 0 ? "No items found" : "Successfully fetched items",
      result: itemsWithBase64,
    });
  });
};


module.exports = { insertSellItem, getSellItems };
