// db.js
require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD, 
  database: process.env.DATABASE,
  port: process.env.PORTBASE,
});

connection.connect(err => {
  if (err) throw err;
  console.log('🟢 Conectado a la base de datos MySQL');
});

module.exports = connection;
