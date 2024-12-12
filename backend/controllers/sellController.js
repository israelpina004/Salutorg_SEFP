const db = require("../models/db");

// const insertSellItem = (req, res) => {
//   const { name, description, item_condition, category, starting_price, deadline } = req.body;
//   const image = req.file ? req.file.buffer : null;

//   // Log received data to make sure everything is passed correctly
//   console.log({
//     name, description, item_condition, category, starting_price, deadline, image
//   });

//   // Insert into `item` table first
//   const itemSql = `
//     INSERT INTO item (name, description, item_condition, category, image) 
//     VALUES (?, ?, ?, ?, ?);
//   `;
//   const itemValues = [name, description, item_condition, category, image];

//   db.query(itemSql, itemValues, (err, result) => {
//     if (err) {
//       console.error("Database error:", err.message);
//       return res.status(500).json({ error: "Failed to insert item" });
//     }

//     const itemId = result.insertId;

//     // Insert into `sell` table
//     const sellSql = `
//       INSERT INTO sell (item_ID, starting_price, deadline) 
//       VALUES (?, ?, ?);
//     `;
//     const sellValues = [itemId, starting_price, deadline];

//     db.query(sellSql, sellValues, (err) => {
//       if (err) {
//         console.error("Database error:", err.message);
//         return res.status(500).json({ error: "Failed to insert sell details" });
//       }

//       res.status(200).json({ message: "Sell item inserted successfully" });
//     });
//   });
// };

const insertSellItem = (req, res) => {
  const { name, description, item_condition, category, starting_price, deadline, userId } = req.body; // Get userId from request body
  const image = req.file ? req.file.buffer : null;

  // Log received data to make sure everything is passed correctly
  console.log({
    name, description, item_condition, category, starting_price, deadline, image, userId
  });

  // Insert into item table first
  const itemSql = 
    `INSERT INTO item (name, description, item_condition, category, image) 
    VALUES (?, ?, ?, ?, ?);`;
  const itemValues = [name, description, item_condition, category, image];

  db.query(itemSql, itemValues, (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Failed to insert item" });
    }

    const itemId = result.insertId;

    // Insert into sell table, including seller_ID (userId)
    const sellSql = 
      `INSERT INTO sell (item_ID, starting_price, deadline, seller_ID) 
      VALUES (?, ?, ?, ?);`; // Add seller_ID field
    const sellValues = [itemId, starting_price, deadline, userId]; // Include userId in values

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
      sell.current_bid AS topBid, 
      sell.deadline,
      sell.seller_ID -- Include seller ID for filtering
    FROM 
      item
    INNER JOIN 
      sell ON item.item_ID = sell.item_ID
    WHERE 
      sell.status != 'sold';  -- Exclude sold items
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



const placeBid = (req, res) => {
  const { itemId, userId, bidAmount } = req.body;

  // Convert bidAmount to a float to ensure correct comparison
  const parsedBidAmount = parseFloat(bidAmount);

  if (isNaN(parsedBidAmount) || parsedBidAmount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid bid amount." });
  }

  // Now use parsedBidAmount in your queries and checks
  // First, check if the user's balance is sufficient
  const checkUserSql = "SELECT balance FROM user WHERE user_ID = ?";
  db.query(checkUserSql, [userId], (err, userResult) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const userBalance = userResult[0].balance;

    if (userBalance < parsedBidAmount) {
      return res.status(400).json({ success: false, message: "Insufficient balance." });
    }

    // Fetch the current highest bid for the item
    const getCurrentBidSql = "SELECT current_bid FROM sell WHERE item_ID = ?";
    db.query(getCurrentBidSql, [itemId], (err, currentBidResult) => {
      if (err) {
        console.error("Error fetching current bid:", err);
        return res.status(500).json({ success: false, message: "Database error." });
      }

      if (currentBidResult.length === 0) {
        return res.status(404).json({ success: false, message: "Item not found." });
      }

      const currentBid = currentBidResult[0].current_bid;

      if (parsedBidAmount <= currentBid) {
        return res.status(400).json({ success: false, message: "Bid must be higher than the current bid." });
      }

      // Proceed with inserting the bid and updating the current bid
      const getSellIdSql = "SELECT sell_ID FROM sell WHERE item_ID = ?";
      db.query(getSellIdSql, [itemId], (err, sellResult) => {
        if (err) {
          console.error("Error fetching sell_ID:", err);
          return res.status(500).json({ success: false, message: "Database error." });
        }

        if (sellResult.length === 0) {
          return res.status(404).json({ success: false, message: "Sell record not found for this item." });
        }

        const sellId = sellResult[0].sell_ID;

        const insertBidSql = `
          INSERT INTO bid (user_ID, sell_ID, bid_amount) 
          VALUES (?, ?, ?)
        `;

        db.query(insertBidSql, [userId, sellId, parsedBidAmount], (err) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Failed to place bid." });
          }

          // Update the current bid in the sell table
          const updateCurrentBidSql = "UPDATE sell SET current_bid = ? WHERE sell_ID = ?";
          db.query(updateCurrentBidSql, [parsedBidAmount, sellId], (err) => {
            if (err) {
              console.error("Error updating current bid:", err);
              return res.status(500).json({ success: false, message: "Failed to update current bid." });
            }

            res.status(200).json({ success: true, message: "Bid placed successfully." });
          });
        });
      });
    });
  });
};

const getUserSellItems = (req, res) => {
  const { userId } = req.body; // Assume userId is sent in the request body.

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const query = `
    SELECT 
      i.item_ID AS id, 
      i.name, 
      i.description, 
      i.item_condition, 
      i.category, 
      i.image, 
      s.starting_price,
      s.current_bid, 
      s.deadline 
    FROM item i
    INNER JOIN sell s ON i.item_ID = s.item_ID
    WHERE s.seller_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch items." });
    }

    res.status(200).json({ items: results });
  });
};

module.exports = { insertSellItem, getSellItems, placeBid, getUserSellItems };
