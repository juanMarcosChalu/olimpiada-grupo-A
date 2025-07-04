const express = require('express');
const bcrypt = require('bcryptjs');
const conexion = require('../db');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // guardamos en memoria

// Login
router.patch('/update/:id', upload.single('imagen'), (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, genero, birthday } = req.body;

  if (!nombre || !apellido || !genero || !birthday) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sqlUpdateUser = `
    UPDATE usuarios
    SET nombre = ?, apellido = ?, genero = ?, birthday = ?
    WHERE id = ?
  `;

  conexion.query(sqlUpdateUser, [nombre, apellido, genero, birthday, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error interno al actualizar usuario" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 🔄 Actualizar la sesión con los NUEVOS datos (sin depender de `usuariopasado`)
    const updateSession = async (imagenBuffer = null, tipoMime = null) => {
  try {
    req.session.usuario = {
      ...req.session.usuario,
      id,
      nombre,
      apellido,
      genero,
      birthday,
      ...(imagenBuffer && { 
        imagen: imagenBuffer.toString('base64'),
        tipodeimagen: tipoMime
      })
    };

    // 🔥 Guarda explícitamente la sesión
    await new Promise((resolve, reject) => {
      req.session.save(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la sesión" });
  }
};

    // Caso 1: No hay imagen nueva
    if (!req.file) {
      updateSession();
      return;
    }

    // Caso 2: Hay imagen nueva (actualizar en BD y luego sesión)
    const imagenBuffer = req.file.buffer;
    const tipoMime = req.file.mimetype;

    conexion.query(
      'INSERT INTO imagenes (imagen, tipo_mime, nombre) VALUES (?, ?, ?)',
      [imagenBuffer, tipoMime, "user Image"],
      (err, resultImagen) => {
        if (err) {
          console.error("Error guardando imagen:", err);
          return res.status(500).json({ error: "Error interno guardando imagen" });
        }

        const nuevaImagenId = resultImagen.insertId;

        conexion.query(
          'UPDATE usuario_imagen SET imagen_id = ? WHERE usuario_id = ?',
          [nuevaImagenId, id],
          (err, resultUsuarioImagen) => {
            if (err || resultUsuarioImagen.affectedRows === 0) {
              // Si no existe la relación, crearla
              conexion.query(
                'INSERT INTO usuario_imagen (usuario_id, imagen_id) VALUES (?, ?)',
                [id, nuevaImagenId],
                (err) => {
                  if (err) return res.status(500).json({ error: "Error insertando relación usuario-imagen" });
                  updateSession(imagenBuffer, tipoMime);
                }
              );
            } else {
              updateSession(imagenBuffer, tipoMime);
            }
          }
        );
      }
    );
  });
});



router.post('/login', (req, res) => {
  
  const { email, password } = req.body.usuario;
  console.log("Datos recibidos:", email.toLowerCase(), password);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const sql = `SELECT 
  u.id,
  u.nombre,
  u.correo,
  u.contrasena,
  u.promociones,
  u.rol,
  u.apellido,
  u.genero,
  u.birthday,
  i.imagen,
  i.tipo_mime
FROM usuarios u
LEFT JOIN usuario_imagen ui ON u.id = ui.usuario_id
LEFT JOIN imagenes i ON ui.imagen_id = i.id
WHERE u.correo = ?;
`;

  conexion.query(sql, [email.toLowerCase()], (err, rows) => {
    if (err) {
      console.error("Error en DB:", err);
      return res.status(500).json({ error: "Error interno" });
    }
    console.log("Resultado de la consulta:", rows);
    if (rows.length === 0) {
      console.warn("Usuario no encontrado");
      return res.status(401).json({ error: "Correo o Contraseña incorrectos" });
    }

    const usuario = rows[0];
    const dbHash = usuario.contrasena?.toString(); // por si es Buffer

    const ok = bcrypt.compareSync(password, dbHash);
    console.log("¿Password correcta?", ok);

    if (!ok) {
      return res.status(401).json({ error: "Correo o Contraseña incorrectos" });
    }

    // Guardar datos mínimos en la sesión
    if(usuario.imagen){
    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.correo,
      rol: usuario.rol,
      apellido: usuario.apellido,
      genero: usuario.genero,
      birthday: usuario.birthday,
      promociones: usuario.promociones,
      imagen: usuario.imagen.toString('base64'),
      tipodeimagen: usuario.tipo_mime ,
    }}
     if(!usuario.imagen){
        req.session.usuario ={
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.correo,
          rol: usuario.rol,
          apellido: usuario.apellido,
          genero: usuario.genero,
          birthday: usuario.birthday,
          promociones: usuario.promociones,
        }
     }
        
    
    
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
      return res.status(500).json({ error: 'Error interno al verificar correo' });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: 'El correo ya está en uso' });
    }

    // Validar si el nombre ya está en uso
    const checkNameQuery = 'SELECT * FROM usuarios WHERE nombre = ?';
    conexion.query(checkNameQuery, [nombre], (err, rows) => {
      if (err) {
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
          return res.status(500).json({ error: 'Error al registrar el usuario' });
        }

        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        conexion.query(sql, [correo], (err, rows) => {
          const usuario = rows[0];

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
