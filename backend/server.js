const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ebid_proj",
});

// Register
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;


  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
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
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // First, check in the 'user' database
  const sqlUser = "SELECT * FROM user WHERE username = ?";
  db.query(sqlUser, [username], async (err, resultsUser) => {
    if (err) {
      console.error("Error during login (user database):", err);
      return res.status(500).json({ error: "Database error" });
    }

    // If user is found, compare the entered password with the hashed password
    if (resultsUser.length > 0) {
      const hashedPassword = resultsUser[0].password; // This should be a string
      console.log('Hashed password from DB:', hashedPassword); // Log to check
      
      if (!hashedPassword || typeof hashedPassword !== 'string') {
        return res.status(400).json({ error: 'Invalid password data in database.' });
      }

      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        return res.json({
          success: true,
          message: "Login successful!",
          redirectTo: "/home", 
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    }

    // If not found in 'user' database, check in the 'superuser' database
    const sqlSuperuser = "SELECT * FROM superuser WHERE username = ?";
    db.query(sqlSuperuser, [username], async (err, resultsSuperuser) => {
      if (err) {
        console.error("Error during login (superuser database):", err);
        return res.status(500).json({ error: "Database error" });
      }

      // If superuser is found, compare the entered password with the hashed password
      if (resultsSuperuser.length > 0) {
        const hashedSuperuserPassword = resultsSuperuser[0].password; // Get the hashed password

        const superuserPasswordMatch = await bcrypt.compare(password, hashedSuperuserPassword); // Compare with bcrypt

        if (superuserPasswordMatch) {
          return res.json({
            success: true,
            message: "Admin login successful!",
            redirectTo: "/admin", 
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid username or password.",
          });
        }
      } else {
        // If not found in either database, return a failure message
        return res.json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    });
  });
});

//Akram Backend
//Differences:
//Database name changed to "mydb"
//Added new column to user table called balance
//ALTER TABLE user ADD COLUMN balance DECIMAL(10, 2) DEFAULT 0.00

app.get('/', (req, res) => {
  let sql = "SELECT * FROM user";
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
  });
});

// Get balance for a specific user
app.get('/balance/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT balance FROM user WHERE user_ID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ balance: results[0]?.balance || 0 });
  });
});

// Update balance (deposit or withdrawal)
app.post("/update-balance", (req, res) => {
  const { userId, amount } = req.body;
  const query = "UPDATE user SET balance = balance + ? WHERE user_ID = ?";
  db.query(query, [amount, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
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

const port = 8081;
app.listen(port, () => {
    console.log("Server listening on port 8081");
});
