// db.js
require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD, 
  database: 'railway',
  port: 35892 
});

connection.connect(err => {
  if (err) throw err;
  console.log('🟢 Conectado a la base de datos MySQL');
});

module.exports = connection;
