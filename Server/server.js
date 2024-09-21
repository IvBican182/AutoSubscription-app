const PORT = process.env.PORT || 3050;

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoute.js');
const userRoutes = require("./routes/userRoute.js");




const app = express();
const pool = require("./db.js");

app.use(bodyParser.json());
app.use(cors());

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

app.use("/api", authRoutes);

app.use("/api", userRoutes);


app.listen(PORT, () => console.log(`Server running on ${PORT}!`));