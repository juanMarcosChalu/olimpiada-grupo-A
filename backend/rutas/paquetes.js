const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:type', (req, res) => {
    const { type } = req.params;
  
 
    
    const query = `
        SELECT 
            p.id,
            p.tipo,
            p.titulo,
            p.precio,
            p.resumen,
            p.detalleServicios,
            p.fondo,
            i.nombre as imagen_nombre,
            i.imagen as imagen_data,
            i.tipo_mime as imagen_tipo
        FROM paquetes p
        LEFT JOIN paquete_imagen pi ON p.id = pi.paquete_id
        LEFT JOIN imagenes i ON pi.imagen_id = i.id
        WHERE p.tipo = ?
    `;

    db.query(query,[type], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        
        const paquetes = results.map(paquete => {
            // Convertir imagen a base64 si existe
            const imagenBase64 = paquete.imagen_data 
                ? paquete.imagen_data.toString('base64') 
                : null;

            return {
                id: paquete.id,
                tipo: paquete.tipo,
                titulo: paquete.titulo,
                precio: paquete.precio,
                resumen: paquete.resumen,
                detalleServicios: paquete.detalleServicios ? JSON.parse(paquete.detalleServicios) : null,
                fondo: paquete.fondo,
                imagen: {
                    nombre: paquete.imagen_nombre,
                    data: imagenBase64,
                    tipo: paquete.imagen_tipo
                }
            };
        });

        res.json(paquetes);
    });
});

module.exports = router;