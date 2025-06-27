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
    if (err) return res.status(500).json({ error: `Error interno` });
    if (rows.length === 0) return res.status(401).json({ error: `Correo o Contraseña incorrectos` });

    const usuario = rows[0];
    console.log(usuario);

    const ok = bcrypt.compareSync(password, usuario.contrasena);

    if (!ok) return res.status(401).json({ error: "Correo o Contraseña incorrectos" });

    // Guardar datos mínimos en la sesión
    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.correo,
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
  const { nombre, password, correo, recibirPromos } = req.body.usuario;
  console.log(req.body.usuario);

  if (nombre === null || password == null || correo == null || recibirPromos == null || nombre === "" || password === "" || correo === "" || recibirPromos === ""
  ) {
    return res.status(400).json({
      error: "Debes de completar todos los campos"
    });
  }
  const contraseñaSegura = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!contraseñaSegura.test(password)) {
    return res.status(400).json({
      error: "La contraseña debe tener al menos una mayúscula, un número y un carácter especial, y mínimo 8 caracteres."
    });
  }

  // Validar si el correo ya está en uso
  const checkEmailQuery = 'SELECT * FROM usuarios WHERE correo = ?';
  conexion.query(checkEmailQuery, [correo], (err, rows) => {
    if (err) {
      console.log('❌ Error al verificar correo existente:', err);
      return res.status(500).json({ error: 'Error interno al verificar correo' });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: 'El correo ya está en uso' });
    }

    // Validar si el nombre ya está en uso
    const checkNameQuery = 'SELECT * FROM usuarios WHERE nombre = ?';
    conexion.query(checkNameQuery, [nombre], (err, rows) => {
      if (err) {
        console.log('❌ Error al verificar usuario existente:', err);
        return res.status(500).json({ error: 'Error interno al verificar usuario' });
      }

      if (rows.length > 0) {
        return res.status(409).json({ error: 'El nombre del usuario ya está en uso' });
      }

      // Todo validado: insertar usuario
      const hash = bcrypt.hashSync(password, 6);
      const insertQuery = 'INSERT INTO usuarios (nombre, contrasena, rol, correo, promociones) VALUES (?, ?, ?, ?, ?)';
      const rol = "user";



      conexion.query(insertQuery, [nombre, hash, rol, correo, recibirPromos], (error) => {
        if (error) {
          console.log('❌ Error al registrar usuario:', error);
          return res.status(500).json({ error: 'Error al registrar el usuario' });
        }

        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        conexion.query(sql, [correo], (err, rows) => {
          const usuario = rows[0];
          console.log(usuario);
          
          req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.correo,
            rol: usuario.rol,
          };
          res.json({ mensaje: "Registro exitoso", usuario: req.session.usuario });
        });


        
      });
    });
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.clearCookie('connect.sid'); // Borra la cookie del navegador
    res.send("Sesión cerrada");
  });
});

module.exports = router;
