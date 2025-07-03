// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'BpEOlXsXFJEAFKzXuQVOCWPNiTdWxqiy', // ← reemplazá con la tuya
  database: 'railway',
  port: 35892 // ← puerto de la base de datos
});

connection.connect(err => {
  if (err) throw err;
  console.log('🟢 Conectado a la base de datos MySQL');
});

module.exports = connection;
