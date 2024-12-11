const db = require("../models/db");

const insertSellItem = (req, res) => {
  const { name, description, item_condition, category, starting_price, deadline } = req.body;
  const image = req.file ? req.file.buffer : null;

  // Log received data to make sure everything is passed correctly
  console.log({
    name, description, item_condition, category, starting_price, deadline, image
  });

  // Insert into `item` table first
  const itemSql = `
    INSERT INTO item (name, description, item_condition, category, image) 
    VALUES (?, ?, ?, ?, ?);
  `;
  const itemValues = [name, description, item_condition, category, image];

  db.query(itemSql, itemValues, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Failed to insert item" });
    }

    const itemId = result.insertId;

    // Insert into `sell` table
    const sellSql = `
      INSERT INTO sell (item_ID, starting_price, deadline) 
      VALUES (?, ?, ?);
    `;
    const sellValues = [itemId, starting_price, deadline];

    db.query(sellSql, sellValues, (err) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Failed to insert sell details" });
      }

      res.status(200).json({ message: "Sell item inserted successfully" });
    });
  });
};

const getSellItems = (req, res) => {
  const sql = `
    SELECT 
      item.item_ID AS id, 
      item.name, 
      item.description, 
      item.item_condition, 
      item.category, 
      item.image, 
      sell.starting_price AS price, 
      sell.deadline
    FROM 
      item
    INNER JOIN 
      sell ON item.item_ID = sell.item_ID;
  `;

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
