const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        // 1. Consulta todos los alojamientos
        const alojamientosQuery = `
            SELECT 
                id, nombre, descripcion, precio_total, noches,
                wifi, cocina, calefaccion, mascotas, piscina
            FROM alojamientos
        `;
        
        const [alojamientos] = await db.promise().query(alojamientosQuery);

        // 2. Para cada alojamiento, obtener sus imágenes
        const alojamientosConImagenes = await Promise.all(
            alojamientos.map(async (alojamiento) => {
                const imagenesQuery = `
                    SELECT 
                        i.id, i.nombre, i.imagen, i.tipo_mime
                    FROM imagenes i
                    JOIN alojamiento_imagen ai ON i.id = ai.imagen_id
                    WHERE ai.alojamiento_id = ?
                `;
                
                const [imagenes] = await db.promise().query(imagenesQuery, [alojamiento.id]);

                // Convertir imágenes a base64
                const imagenesFormateadas = imagenes.map(img => ({
                    id: img.id,
                    nombre: img.nombre,
                    data: img.imagen.toString('base64'),
                    tipo: img.tipo_mime
                }));

                // Formatear precio
                const precioFormateado = `$${alojamiento.precio_total.toLocaleString('es-AR')} ARS · ${alojamiento.noches} ${alojamiento.noches === 1 ? 'noche' : 'noches'}`;

                return {
                    id: alojamiento.id,
                    nombre: alojamiento.nombre,
                    descripcion: alojamiento.descripcion,
                    precio: precioFormateado,
                    imagenes: imagenesFormateadas,
                    caracteristicas: {
                        wifi: Boolean(alojamiento.wifi),
                        cocina: Boolean(alojamiento.cocina),
                        calefaccion: Boolean(alojamiento.calefaccion),
                        mascotas: Boolean(alojamiento.mascotas),
                        piscina: Boolean(alojamiento.piscina)
                    }
                };
            })
        );

        res.json(alojamientosConImagenes);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;