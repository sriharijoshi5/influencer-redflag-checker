



const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const app = express(); // 🔁 This should come first

// ✅ Middleware — must come before any routes
const corsOptions = {
    origin: "https://majestic-tanuki-ca1f9b.netlify.app", // your Netlify site
    methods: ["GET", "POST"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  

  app.use(express.json());





const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // for Render
  },
});




app.post("/report", async (req, res) => {
    const { handle, reason } = req.body;
  
    if (!handle || !reason) {
      return res.status(400).json({ error: "Handle and reason are required" });
    }
  
    try {
      const result = await pool.query(
        "INSERT INTO reports (handle, reason) VALUES ($1, $2) RETURNING *",
        [handle, reason]
      );
  
      res.status(201).json({ message: "Report submitted", report: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Red Flag Checker backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

app.get("/reports", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM reports ORDER BY created_at DESC LIMIT 50");
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong while fetching reports" });
    }
  });
  