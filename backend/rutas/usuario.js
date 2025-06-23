// rutas/usuarios.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Endpoint de registro
router.post("/registro", (req, res) => {
  const { nombre, correo, contrasena, recibirPromos } = req.body;

  // Validaciones básicas
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: "Completa todos los campos." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return res.status(400).json({ message: "Correo electrónico inválido." });
  }

  if (contrasena.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }

  // Verifica si ya existe el correo
  db.query("SELECT * FROM usuarios WHERE correo = ?", [correo], (err, result) => {
    if (err) return res.status(500).json({ message: "Error del servidor" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Este correo ya está registrado." });
    }

    // Inserta el nuevo usuario
    const sql = "INSERT INTO usuarios (nombre, correo, contrasena, promociones) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, correo, contrasena, recibirPromos ? 1 : 0], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al registrar usuario" });
      req.session.usuario = { nombre, correo, rol: "user" };
      return res.status(201).json({ message: "Usuario registrado correctamente" });
    });
  });
});

router.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Correo no registrado' });
    }

    const usuario = results[0];

    if (usuario.contrasena !== contrasena) { // En producción usa bcrypt
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    res.json({ message: 'Login exitoso', usuario: req.session.usuario });
  });
});


router.get("/usuario-actual", (req, res) => {
  if (req.session.usuario) {
    return res.json(req.session.usuario);
  } else {
    return res.status(401).json({ message: "No has iniciado sesión" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie("connect.sid");
    return res.json({ message: "Sesión cerrada correctamente" });
  });
});

module.exports = router;
