// db.js
require("dotenv").config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "juan", 
  database: 'formulario',
  port: 3306 
});

connection.connect(err => {
  if (err) throw err;
  console.log('🟢 Conectado a la base de datos MySQL');
});

module.exports = connection;
