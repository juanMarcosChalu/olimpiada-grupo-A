// ./middleware/authMiddleware.js

function soloLogueados(req, res, next) {
  if (req.session && req.session.usuario) {
    // El usuario está logueado, dejar continuar
    next();
  } else {
    // No hay sesión activa
    res.status(401).json({ mensaje: 'No autorizado. Por favor inicia sesión.' });
  }
}

module.exports = { soloLogueados };
