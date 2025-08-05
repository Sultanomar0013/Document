// const mysql = require('mysql2/promise');

// const db = mysql.createPool({
//     host: host.docker.internal, // Use the Docker internal host for MySQL connection
//     user: "root",
//     password: "",
//     database: "document",
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });



// console.log("MySQL connection pool created.");

// module.exports = db;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('document', 'root', '', {
    host: 'host.docker.internal',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

module.exports = sequelize;
