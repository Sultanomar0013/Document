const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "document",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});



console.log("MySQL connection pool created.");

module.exports = db;
