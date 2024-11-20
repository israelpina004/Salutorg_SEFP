// Connects to MySQL databases.

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express()
app.use(cors)
app.use(express.json())

const db = mysql.createConnection({
    // Connection parameters
})

app.post('/SignUpDB', (req, res) =>{
    // Queries to add accounts to the login database.
    // Should make it so that sign ups are only admitted by a super-user.
})

const port = 3000;
app.listen(port, () => {
    console.log("Server listening on port ${port}");
})