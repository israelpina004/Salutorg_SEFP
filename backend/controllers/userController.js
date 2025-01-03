// const bcrypt = require("bcrypt");
// const db = require("../models/db");

// const registerUser = async (req, res) => {
//   const { email, username, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?, ?, ?)";
//     const values = [email, username, hashedPassword];

//     db.query(sql, values, (err, data) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           return res.status(400).json({ error: "Username is already taken." });
//         }
//         return res.status(500).json({ error: "Server error." });
//       }
//       return res.status(200).json({ message: "User registered successfully.", data });
//     });
//   } catch (err) {
//     return res.status(500).json({ error: "Server error during registration." });
//   }
// };

// const loginUser = (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT * FROM user WHERE username = ?";
//   db.query(sql, [username], async (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });

//     if (results.length > 0) {
//       const passwordMatch = await bcrypt.compare(password, results[0].password);
//       if (passwordMatch) {
//         // Update the is_loggedin attribute to TRUE
//         const updateSql = "UPDATE user SET is_loggedin = TRUE WHERE username = ?";
//         db.query(updateSql, [username], (updateErr) => {
//           if (updateErr) return res.status(500).json({ error: "Database update error" });

//           return res.json({ success: true, message: "Login successful!", redirectTo: "/home" });
//         });
//       } else {
//         return res.json({ success: false, message: "Invalid username or password." });
//       }
//     } else {
//       return res.json({ success: false, message: "Invalid username or password." });
//     }
//   });
// };

// const getLoggedInUser = (req, res) => {
//   const sql = "SELECT * FROM user WHERE is_loggedin = TRUE";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ success: false, message: "Database error." });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ success: false, message: "No users are currently logged in." });
//     }

//     // Assuming only one user is logged in
//     const loggedInUser = results[0]; // Get the first logged-in user details
//     return res.json({ success: true, loggedInUser });
//   });
// };

// const logoutUser = (req, res) => {
//   const sqlGetLoggedInUser = "SELECT username FROM user WHERE is_loggedin = TRUE";

//   // Fetch the currently logged-in user
//   db.query(sqlGetLoggedInUser, (getErr, results) => {
//     if (getErr) {
//       console.error("Database error while fetching logged-in user:", getErr);
//       return res.status(500).json({ success: false, message: "Database error during fetching logged-in user." });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ success: false, message: "No user is currently logged in." });
//     }

//     // There should only be one logged-in user based on your website logic
//     const loggedInUser = results[0].username;

//     // Proceed to log out the logged-in user
//     const sqlUpdate = "UPDATE user SET is_loggedin = FALSE WHERE username = ?";
//     db.query(sqlUpdate, [loggedInUser], (updateErr, updateResults) => {
//       if (updateErr) {
//         console.error("Database error during logout:", updateErr);
//         return res.status(500).json({ success: false, message: "Database error during logout." });
//       }

//       console.log(`User '${loggedInUser}' successfully logged out.`);
//       return res.json({ success: true, message: `Logout successful for user '${loggedInUser}'!` });
//     });
//   });
// };


// const getUsers = (req, res) => {
//   const sql = "SELECT * FROM user";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: "Failed to fetch users." });
//     res.json(results);
//   });
// };

// const getBalance = (req, res) => {
//   const userId = req.params.userId;
//   const query = "SELECT balance FROM user WHERE user_ID = ?";
//   db.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ balance: results[0]?.balance || 0 });
//   });
// };

// // const updateBalance = (req, res) => {
// //   const { userId, amount } = req.body;
// //   const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
// //   db.query(query, [amount, userId], (err, results) => {
// //     if (err) {
// //       return res.status(500).json({ error: err.message });
// //     }
// //     res.json({ success: true });
// //   });
// // };

// const updateBalance = (req, res) => {
//   const { userId, amount } = req.body;
//   const numericAmount = Number(amount);

//   if (isNaN(numericAmount)) {
//     return res.status(400).json({ error: "Invalid amount" });
//   }

//   // Update the balance
//   const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
//   db.query(query, [numericAmount, userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     // Query to get the updated balance
//     const selectQuery = "SELECT balance FROM user WHERE user_ID = ?";
//     db.query(selectQuery, [userId], (err, rows) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }

//       // Check if we have balance and return it in the response
//       if (rows.length > 0) {
//         console.log("Updated balance:", rows[0].balance); // Log updated balance
//         res.json({ success: true, balance: rows[0].balance }); // Return the balance in the response
//       } else {
//         res.status(404).json({ error: "User not found" });
//       }
//     });
//   });
// };

// // Add a comment
// const addComment = (req, res) => {
//   const { userId, username, comment } = req.body;

//   const sql = "INSERT INTO comments (userId, username, comment) VALUES (?, ?, ?)";
//   db.query(sql, [userId || null, username, comment], (err, result) => {
//     if (err) {
//       console.error("Error inserting comment:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json({ success: true, message: "Comment added successfully!" });
//   });
// };

// // Get all comments
// const getComments = (req, res) => {
//   const sql = "SELECT * FROM comments ORDER BY createdAt DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching comments:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// };

// const acceptBid = async (req, res) => {
//   const item_ID = req.body.id; // Extract item_ID from the request body
//   console.log("Item ID:", item_ID, typeof(item_ID));

//   try {
//     // Ensure the item_ID is a valid number
//     if (!item_ID) {
//       throw new Error("Invalid item ID. ID is empty.");
//     }

//     if (typeof item_ID !== "number" || isNaN(item_ID)) {
//       throw new Error("Invalid item ID. ID is not a number.");
//     }

//     // Query to fetch item and bid details
//     const query = `
//       SELECT 
//         s.seller_ID, 
//         s.current_bid, 
//         s.item_ID, 
//         b.user_ID AS highest_bidder
//       FROM sell s
//       LEFT JOIN bid b ON s.sell_ID = b.sell_ID
//       WHERE s.item_ID = ? 
//       ORDER BY b.bid_amount DESC
//       LIMIT 1;
//     `;
//     console.log("Query to execute:", query);
//     console.log("Parameters:", [item_ID]);

//     const [result] = await db.promise().query(query, [item_ID]);

//     console.log("Query result:", result);

//     const itemDetails = result[0];

//     if (!itemDetails) {
//       throw new Error("No bid found for this item.");
//     }

//     console.log("Item details retrieved:", itemDetails);

//     const { seller_ID, current_bid, item_ID: itemID, highest_bidder } = itemDetails;

//     // Validate necessary values
//     if (current_bid === 0.0) {
//       throw new Error("No bids on this item.");
//     }
//     if (!highest_bidder || !seller_ID) {
//       throw new Error("Missing bidder or seller data.");
//     }

//     console.log("Inserting transaction with values:", [seller_ID, highest_bidder, itemID]);

//     // Start a transaction
//     await db.promise().beginTransaction();

//     // Insert transaction without amount column
//     const insertTransactionQuery = `
//       INSERT INTO transactions (vendor_ID, customer_ID, item_ID)
//       VALUES (?, ?, ?);
//     `;
//     const [transactionResult] = await db.promise().query(insertTransactionQuery, [seller_ID, highest_bidder, itemID]);

//     if (transactionResult.affectedRows === 0) {
//       throw new Error("Failed to insert transaction.");
//     }

//     console.log("Transaction inserted successfully:", transactionResult);

//     // Transfer funds to seller and deduct from bidder
//     const transferFundsQuery = `
//       UPDATE \`user\` 
//       SET balance = balance + ? 
//       WHERE user_ID = ?;
//     `;

//     const [sellerFundsResult] = await db.promise().query(transferFundsQuery, [current_bid, seller_ID]);
//     const [bidderFundsResult] = await db.promise().query(transferFundsQuery, [-current_bid, highest_bidder]);

//     if (sellerFundsResult.affectedRows === 0 || bidderFundsResult.affectedRows === 0) {
//       throw new Error("Failed to update balances.");
//     }

//     // Update item status to 'sold' in the sell table
//     const updateStatusQuery = `UPDATE sell SET status = 'sold' WHERE item_ID = ?;`;
//     const [updateResult] = await db.promise().query(updateStatusQuery, [itemID]);

//     if (updateResult.affectedRows === 0) {
//       throw new Error("Failed to update item status to 'sold'.");
//     }

//     // Commit the transaction
//     await db.promise().commit();

//     console.log(`Bid accepted! Item ID: ${itemID}, Seller ID: ${seller_ID}, Customer ID: ${highest_bidder}, Amount: ${current_bid}`);
//     return res.json({ success: true, message: `Bid accepted for item ${itemID}. Transaction completed.` });

//   } catch (error) {
//     console.error("Error accepting bid:", error.message);
//     await db.promise().rollback(); // Rollback if anything fails
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };


// const updateRating = (req, res) => {
//   const { sellerId, rating } = req.body; 

//   const findSellerQuery = "SELECT user_ID FROM sell WHERE seller_ID = ?"; 
//   db.query(findSellerQuery, [sellerId], (err, results) => { 
//     if (err) {
//       console.error("Error finding seller:", err); 
//       return res.status(500).json({ error: "Database error during seller lookup." });
//     } 

//     if (results.length === 0) {
//       return res.status(404).json({ error: "Seller not found." });
//     } 

//     const userId = results[0].user_ID; 

//     const updateRatingQuery = "UPDATE user SET rating = ? WHERE user_ID = ?"; 
//     db.query(updateRatingQuery, [rating, userId], (updateErr, updateResult) => {
//       if (updateErr) {
//         console.error("Error updating seller rating:", updateErr);
//         return res.status(500).json({ error: "Database error during rating update." }); 
//       } 
//       res.json({ success: true, message: "Seller rating updated successfully!" }); 
//     }); 
//   }); 
// };

// const getPurchases = (req, res) => {
//   const { customerId } = req.body;

//   if (!customerId) {
//     console.error("Customer ID not provided.");
//     return res.status(400).json({ success: false, error: "Customer ID is required." });
//   }

//   const query = `
//   SELECT 
//     t.transaction_ID AS id,
//     i.name AS item_name,
//     i.image AS item_image,
//     t.date AS purchase_date,
//     s.starting_price AS price,
//     t.vendor_ID AS seller_id
//   FROM transactions t
//   INNER JOIN item i ON t.item_ID = i.item_ID
//   LEFT JOIN sell s ON i.item_ID = s.item_ID
//   WHERE t.customer_ID = ?
//   ORDER BY t.date DESC;
// `;

//   db.query(query, [customerId], (err, results) => {
//     if (err) {
//       console.error("Error fetching purchases:", err.message);
//       return res.status(500).json({ success: false, error: "Database error while fetching purchases." });
//     }

//     console.log("Purchases fetched successfully:", results);
//     res.status(200).json({ success: true, purchases: results });
//   });
// };


// module.exports = 
// { registerUser, 
//   loginUser, 
//   getUsers, 
//   getBalance, 
//   updateBalance,
//   logoutUser,
//   getLoggedInUser,
//   addComment, 
//   getComments,
//   acceptBid,
//   updateRating,
//   getPurchases,
//  };

const bcrypt = require("bcrypt");
const db = require("../models/db");

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user (`email`, `username`, `password`) VALUES (?, ?, ?)";
    const values = [email, username, hashedPassword];

    db.query(sql, values, (err, data) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Username is already taken." });
        }
        return res.status(500).json({ error: "Server error." });
      }
      return res.status(200).json({ message: "User registered successfully.", data });
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error during registration." });
  }
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const passwordMatch = await bcrypt.compare(password, results[0].password);
      if (passwordMatch) {
        // Update the is_loggedin attribute to TRUE
        const updateSql = "UPDATE user SET is_loggedin = TRUE WHERE username = ?";
        db.query(updateSql, [username], (updateErr) => {
          if (updateErr) return res.status(500).json({ error: "Database update error" });

          return res.json({ success: true, message: "Login successful!", redirectTo: "/home" });
        });
      } else {
        return res.json({ success: false, message: "Invalid username or password." });
      }
    } else {
      return res.json({ success: false, message: "Invalid username or password." });
    }
  });
};

const getLoggedInUser = (req, res) => {
  const sql = "SELECT * FROM user WHERE is_loggedin = TRUE";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No users are currently logged in." });
    }

    // Assuming only one user is logged in
    const loggedInUser = results[0]; // Get the first logged-in user details
    return res.json({ success: true, loggedInUser });
  });
};

const logoutUser = (req, res) => {
  const sqlGetLoggedInUser = "SELECT username FROM user WHERE is_loggedin = TRUE";

  // Fetch the currently logged-in user
  db.query(sqlGetLoggedInUser, (getErr, results) => {
    if (getErr) {
      console.error("Database error while fetching logged-in user:", getErr);
      return res.status(500).json({ success: false, message: "Database error during fetching logged-in user." });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No user is currently logged in." });
    }

    // There should only be one logged-in user based on your website logic
    const loggedInUser = results[0].username;

    // Proceed to log out the logged-in user
    const sqlUpdate = "UPDATE user SET is_loggedin = FALSE WHERE username = ?";
    db.query(sqlUpdate, [loggedInUser], (updateErr, updateResults) => {
      if (updateErr) {
        console.error("Database error during logout:", updateErr);
        return res.status(500).json({ success: false, message: "Database error during logout." });
      }

      console.log(`User '${loggedInUser}' successfully logged out.`);
      return res.json({ success: true, message: `Logout successful for user '${loggedInUser}'!` });
    });
  });
};


const getUsers = (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch users." });
    res.json(results);
  });
};

const getBalance = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT balance FROM user WHERE user_ID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ balance: results[0]?.balance || 0 });
  });
};

// const updateBalance = (req, res) => {
//   const { userId, amount } = req.body;
//   const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
//   db.query(query, [amount, userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ success: true });
//   });
// };

const updateBalance = (req, res) => {
  const { userId, amount } = req.body;
  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  // Update the balance
  const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
  db.query(query, [numericAmount, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Query to get the updated balance
    const selectQuery = "SELECT balance FROM user WHERE user_ID = ?";
    db.query(selectQuery, [userId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Check if we have balance and return it in the response
      if (rows.length > 0) {
        console.log("Updated balance:", rows[0].balance); // Log updated balance
        res.json({ success: true, balance: rows[0].balance }); // Return the balance in the response
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
  });
};

// Add a comment
const addComment = (req, res) => {
  const { userId, username, comment } = req.body;

  const sql = "INSERT INTO comments (userId, username, comment) VALUES (?, ?, ?)";
  db.query(sql, [userId || null, username, comment], (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, message: "Comment added successfully!" });
  });
};

// Get all comments
const getComments = (req, res) => {
  const sql = "SELECT * FROM comments ORDER BY createdAt DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const acceptBid = async (req, res) => {
  const item_ID = req.body.id; // Extract item_ID from the request body
  console.log("Item ID:", item_ID, typeof(item_ID));

  try {
    // Ensure the item_ID is a valid number
    if (!item_ID) {
      throw new Error("Invalid item ID. ID is empty.");
    }

    if (typeof item_ID !== "number" || isNaN(item_ID)) {
      throw new Error("Invalid item ID. ID is not a number.");
    }

    // Query to fetch item and bid details
    const query = `
      SELECT 
        s.seller_ID, 
        s.current_bid, 
        s.item_ID, 
        b.user_ID AS highest_bidder
      FROM sell s
      LEFT JOIN bid b ON s.sell_ID = b.sell_ID
      WHERE s.item_ID = ? 
      ORDER BY b.bid_amount DESC
      LIMIT 1;
    `;
    console.log("Query to execute:", query);
    console.log("Parameters:", [item_ID]);

    const [result] = await db.promise().query(query, [item_ID]);

    console.log("Query result:", result);

    const itemDetails = result[0];

    if (!itemDetails) {
      throw new Error("No bid found for this item.");
    }

    console.log("Item details retrieved:", itemDetails);

    const { seller_ID, current_bid, item_ID: itemID, highest_bidder } = itemDetails;

    // Validate necessary values
    if (current_bid === 0.0) {
      throw new Error("No bids on this item.");
    }
    if (!highest_bidder || !seller_ID) {
      throw new Error("Missing bidder or seller data.");
    }

    console.log("Inserting transaction with values:", [seller_ID, highest_bidder, itemID]);

    // Start a transaction
    await db.promise().beginTransaction();

    // Insert transaction without amount column
    const insertTransactionQuery = `
      INSERT INTO transactions (vendor_ID, customer_ID, item_ID)
      VALUES (?, ?, ?);
    `;
    const [transactionResult] = await db.promise().query(insertTransactionQuery, [seller_ID, highest_bidder, itemID]);

    if (transactionResult.affectedRows === 0) {
      throw new Error("Failed to insert transaction.");
    }

    console.log("Transaction inserted successfully:", transactionResult);

    // Transfer funds to seller and deduct from bidder
    const transferFundsQuery = `
      UPDATE \`user\` 
      SET balance = balance + ? 
      WHERE user_ID = ?;
    `;

    const [sellerFundsResult] = await db.promise().query(transferFundsQuery, [current_bid, seller_ID]);
    const [bidderFundsResult] = await db.promise().query(transferFundsQuery, [-current_bid, highest_bidder]);

    if (sellerFundsResult.affectedRows === 0 || bidderFundsResult.affectedRows === 0) {
      throw new Error("Failed to update balances.");
    }

    // Update item status to 'sold' in the sell table
    const updateStatusQuery = `UPDATE sell SET status = 'sold' WHERE item_ID = ?;`;
    const [updateResult] = await db.promise().query(updateStatusQuery, [itemID]);

    if (updateResult.affectedRows === 0) {
      throw new Error("Failed to update item status to 'sold'.");
    }

    // Commit the transaction
    await db.promise().commit();

    console.log(`Bid accepted! Item ID: ${itemID}, Seller ID: ${seller_ID}, Customer ID: ${highest_bidder}, Amount: ${current_bid}`);
    return res.json({ success: true, message: `Bid accepted for item ${itemID}. Transaction completed.` });

  } catch (error) {
    console.error("Error accepting bid:", error.message);
    await db.promise().rollback(); // Rollback if anything fails
    return res.status(400).json({ success: false, message: error.message });
  }
};


const updateRating = (req, res) => {
  const { userId, rating } = req.body; 

  // Update rating
  const sql = "UPDATE user SET rating = ? WHERE user_ID = ?";
  db.query(sql, [rating, userId], (err, result) => {
    if (err) {
      console.error("Error updating rating:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ success: true, message: "Rating updated successfully!" });
  });
};


const getPurchases = (req, res) => {
  const { customerId } = req.body;

  if (!customerId) {
    console.error("Customer ID not provided.");
    return res.status(400).json({ success: false, error: "Customer ID is required." });
  }

  const query = `
  SELECT 
    t.transaction_ID AS id,
    i.name AS item_name,
    i.image AS item_image,
    t.date AS purchase_date,
    s.starting_price AS price,
    t.vendor_ID AS seller_id
  FROM transactions t
  INNER JOIN item i ON t.item_ID = i.item_ID
  LEFT JOIN sell s ON i.item_ID = s.item_ID
  WHERE t.customer_ID = ?
  ORDER BY t.date DESC;
`;

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error("Error fetching purchases:", err.message);
      return res.status(500).json({ success: false, error: "Database error while fetching purchases." });
    }

    console.log("Purchases fetched successfully:", results);
    res.status(200).json({ success: true, purchases: results });
  });
};


module.exports = 
{ registerUser, 
  loginUser, 
  getUsers, 
  getBalance, 
  updateBalance,
  logoutUser,
  getLoggedInUser,
  addComment, 
  getComments,
  acceptBid,
  updateRating,
  getPurchases,
 };
