// Connects to MySQL databases.

// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors")

// const app = express()
// app.use(cors)
// app.use(express.json())

// const db = mysql.createConnection({
//     // Connection parameters
// })

// app.post('/SignUpDB', (req, res) =>{
//     // Queries to add accounts to the login database.
//     // Should make it so that sign ups are only admitted by a super-user.
// })

// const port = 3000;
// app.listen(port, () => {
//     console.log("Server listening on port ${port}");
// })
// GPT GENERATED

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const app = express();
app.use(bodyParser.json());
const cors=require("cors");
app.use(cors());
const multer=require('multer');
const upload=multer();

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "project-password",
  database: "ebid_proj",
});


db.connect((err)=>{
  if(err){
    console.error("Error connecting to MYSQL Database", err.stack);
    return;
  }
  console.log("Successfully connected to MYSQL Database");

  const testQuery = 'SELECT COUNT(*) AS count FROM sell_item';  // Replace 'item' with your table name

  db.query(testQuery, (err, result) => {
    if (err) {
      console.error('Error executing test query:', err.message);
    } else {
      console.log(`Test query result: ${result[0].count} records found in "sell_item" table`);
    }
  });
  
});


// Route to register a new user (Viewer applies to become a User)
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  // Check if email or username already exists
  const existingUser = await db
    .promise()
    .query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);

  if (existingUser[0].length > 0) {
    return res.status(400).json({ error: "Email or username already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user with 'pending' status
  db.query(
    "INSERT INTO users (email, username, password, role, status) VALUES (?, ?, ?, 'viewer', 'pending')",
    [email, username, hashedPassword],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error registering user" });
      }
      res.status(201).json({ message: "Application submitted for approval" });
    }
  );
});

// Route to get all pending applications (SuperUser approval screen)
app.get("/api/pending-approvals", (req, res) => {
  db.query("SELECT id, email, username, created_at FROM users WHERE status = 'pending'", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching pending approvals" });
    }
    res.json(results);
  });
});

// Route to approve or reject a user
app.post("/api/approve", (req, res) => {
  const { id, action } = req.body;

  // Validate action
  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  const status = action === "approve" ? "approved" : "rejected";

  db.query("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error updating user status" });
    }
    res.json({ message: `User ${action}d successfully` });
  });
});



//Insert Sell item 
app.post("/api/insertNewSell", upload.single('url'), (req, res) => {
  const { name, startPrice, condition, category, deadline, description } = req.body;
  const url=req.file;
  
  // Input validation
  if (!name || !startPrice || !condition || !category || !deadline || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO sell_item (name, starting_price, `condition`, category, deadline, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [name, startPrice, condition, category, deadline, description, url.buffer];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    console.log("Insert result:", result);
    res.status(200).json({ message: "Data inserted successfully", result });
  });
});



//Read from sell_item
app.get("/api/readSellItems", (req, res)=>{
  
  const instruct="SELECT * FROM sell_item";
  
  db.query(instruct, (err, result)=>{
    if (err){
      return res.status(500).json({error: "Failed to read from item"});
    }

    const itemsWithBase64 = result.map(item => {
      if (item.image) {
          item.image = item.image.toString('base64');
      }
      return item;
  });
    res.status(200).json({ message: "Successfully read from item", result: itemsWithBase64});
  })
})

//Insert Rent Item  
app.post("/api/insertNewRent", upload.single('url'), (req, res) => {
  const { name, rate, condition, category, description} = req.body;
  const url=req.file;

  // Input validation
  if (!name || !rate || !condition || !category || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO rent_item (name, rental_rate, `condition`, category, description, image ) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, rate, condition, category, description, url.buffer ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    console.log("Insert result:", result);
    res.status(200).json({ message: "Data inserted successfully", result });
  });
});



//Read from rent_item
app.get("/api/readRentItems", (req, res)=>{
  
  const instruct="SELECT * FROM rent_item";
  
  db.query(instruct, (err, result)=>{
    if (err){
      return res.status(500).json({error: "Failed to read from rent_item"});
    }
    const itemsWithBase64 = result.map(item => {
      if (item.image) {
          item.image = item.image.toString('base64');
      }
      return item;
    });
    res.status(200).json({ message: "Successfully read from rent_item", result: itemsWithBase64 });
  })
})




// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
