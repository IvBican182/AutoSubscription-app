const { Pool } = require('pg');
require("dotenv").config({
    override: true,
});


const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: "AutoSubscription"
})

module.exports = pool;