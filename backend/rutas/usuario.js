const express = require('express');
const bcrypt = require('bcryptjs');
const conexion = require('../db');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body.usuario;

  if (!email || !password) {
   
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  conexion.query(sql, [email], (err, rows) => {
    if (err) return res.status(500).json({error:`Error interno`});
    if (rows.length === 0) return res.status(401).json({error:`Usuario no encontrado`});

    const usuario = rows[0];
    console.log(usuario);
    
    const ok = bcrypt.compareSync(password, usuario.contrasena);

    if (!ok) return res.status(401).json({error:"Contraseña incorrecta"});

    // Guardar datos mínimos en la sesión
    req.session.usuario = {
      id: usuario.idTabla,
      nombre: usuario.nombre,
      email:usuario.correo,
      rol: usuario.rol,
    };

    // Confirmar login
    res.json({ mensaje: "Inicio de sesión exitoso", usuario: req.session.usuario });
  });
});
// Por ejemplo: /usuario/sesion
router.get('/sesion', (req, res) => {
  if (req.session.usuario) {
    res.json({ logueado: true, usuario: req.session.usuario });
  } else {
    res.status(401).json({ logueado: false, mensaje: "No hay sesión activa" });
  }
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
      return res.status(500).json({ error: 'Error interno al verificar usuario' });
    }

    if (rows.length > 0) {
     return res.status(409).json({ error: 'El nombre del usuario ya esta en uso' });
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
