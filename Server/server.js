const PORT = process.env.PORT || 6000;

const express = require("express");
const app = express();
const pool = require("./db.js");

app.get("/juniors", async (req,res) => {
    try {
        const groups = await pool.query('SELECT * FROM groups');
        res.json(groups.rows);

    }
    catch (err) {
        console.error("Database connection test failed:", err);
        res.status(500).json({ error: "Failed to fetch groups" });
    }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}!`));