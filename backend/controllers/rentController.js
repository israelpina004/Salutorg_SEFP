const db = require("../models/db");

const insertRentItem = (req, res) => {
  const { name, rate, condition, category, description } = req.body;
  const url = req.file;

  if (!name || !rate || !condition || !category || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO rent_item (name, rental_rate, `condition`, category, description, image) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, rate, condition, category, description, url.buffer];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    res.status(200).json({ message: "Data inserted successfully", result });
  });
};

const getRentItems = (req, res) => {
  const sql = "SELECT * FROM rent_item";

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

    res.status(200).json({ message: "Successfully fetched items", result: itemsWithBase64 });
  });
};


module.exports = { insertRentItem, getRentItems };
