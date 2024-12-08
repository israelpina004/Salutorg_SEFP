const db = require("../models/db");

const db = require("../models/db");

const insertRentItem = (req, res) => {
  const { name, description, item_condition, category, rental_rate } = req.body;
  const image = req.file ? req.file.buffer : null;

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

    // Insert into `rent` table
    const rentSql = `
      INSERT INTO rent (item_ID, rental_rate) 
      VALUES (?, ?);
    `;
    const rentValues = [itemId, rental_rate];

    db.query(rentSql, rentValues, (err) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Failed to insert rent details" });
      }

      res.status(200).json({ message: "Rent item inserted successfully" });
    });
  });
};

const getRentItems = (req, res) => {
  const sql = `
    SELECT 
      item.item_ID AS id, 
      item.name, 
      item.description, 
      item.item_condition, 
      item.category, 
      item.image, 
      rent.rental_rate AS rate
    FROM 
      item
    INNER JOIN 
      rent ON item.item_ID = rent.item_ID;
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

module.exports = { insertRentItem, getRentItems };

