const express = require('express');
const bcrypt = require('bcryptjs');
const conexion = require('../db');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { nombre, password } = req.body.usuario;

  if (!nombre || !password) {
    return res.status(400).send('Nombre y contraseña son requeridos');
  }

  const sql = "SELECT * FROM usuarios WHERE nombre = ?";
  conexion.query(sql, [nombre], (err, rows) => {
    if (err) return res.status(500).send("Error interno");
    if (rows.length === 0) return res.status(401).send("Usuario no encontrado");

    const usuario = rows[0];
    const ok = bcrypt.compareSync(password, usuario.Contra);

    if (!ok) return res.status(401).send("Contraseña incorrecta");

    // Guardar datos mínimos en la sesión
    req.session.usuario = {
      id: usuario.idTabla,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    // Confirmar login
    res.json({ mensaje: "Inicio de sesión exitoso", usuario: req.session.usuario });
  });
});

// Registro
router.post('/registrar', (req, res) => {
  const { nombre, password,correo,recibirPromos } = req.body.usuario;
  console.log(req.body.usuario);
  
  const checkQuery = 'SELECT * FROM usuarios WHERE nombre = ?';
  conexion.query(checkQuery, [nombre], (err, rows) => {
    console.log(err);
    
    if (err) {
      console.log('❌ Error al verificar usuario existente:', err);
      return res.status(500).send('Error interno al verificar usuario');
    }

    if (rows.length > 0) {
      return res.status(409).send('El nombre de usuario ya está en uso');
    }

    const hash = bcrypt.hashSync(password, 6);
    const insertQuery = 'INSERT INTO usuarios (nombre, contrasena, rol,correo,promociones) VALUES (?, ?, ?,? ,? )';
    const rol = "user";

    conexion.query(insertQuery, [nombre, hash, rol,correo,recibirPromos], (error) => {
      if (error) {
        console.log('❌ Error al registrar usuario:', error);
        return res.status(500).send('Error al registrar el usuario');
      }
      res.send('Registro exitoso');
    });
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.clearCookie('connect.sid'); // Borra la cookie del navegador
    res.send("Sesión cerrada");
  });
});

module.exports = router;
