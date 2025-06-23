// rutas/paquetes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM paquetes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(results);

        // Parsear detalleServicios como JSON
        const paquetes = results.map(paquete => {
            // Convierte Buffer a base64
            const imagenBase64 = paquete.imagen.toString('base64');

            return {
                ...paquete,
                detalleServicios: JSON.parse(paquete.detalleServicios),
                imagenBase64, // Agregamos la imagen en base64
                imagen: undefined // Opcional: eliminar el buffer crudo si no lo necesitas
            };
        });


        res.json(paquetes);
    });
});

module.exports = router;
