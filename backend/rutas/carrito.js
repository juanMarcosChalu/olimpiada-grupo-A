const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/obtenerProductos', (req, res) => {
    const { idCliente,nombre, password, correo, recibirPromos } = req.body.usuario;
    const query = `SELECT * FROM carrito WHERE idCliente = ?`;

    db.query(query,idCliente, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const carritoProductos=results;
        console.log("resutados"+results);
        res.json(carritoProductos);
    });
});

module.exports = router;

router.post('/registrar', (req, res) => {
  const { nombre, password, correo, recibirPromos } = req.body.usuario;
  console.log(req.body.usuario);


  // Validar si el correo ya está en uso
  const checkEmailQuery = 'SELECT * FROM usuarios WHERE correo = ?';
  conexion.query(checkEmailQuery, [correo], (err, rows) => {
  
    
   
    
  });
});