const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = `
        SELECT 
    a.id,
    a.nombre,
    a.precio_por_dia AS precio,
    a.descripcion,
    MAX(i.nombre) AS imagen_nombre,  -- o GROUP_CONCAT si quieres todos los nombres
    MAX(i.imagen) AS imagen_data,    -- cuidado con esto, puede no ser lo que quieres
    MAX(i.tipo_mime) AS imagen_tipo,
    GROUP_CONCAT(DISTINCT c.nombre ORDER BY c.id SEPARATOR '||') AS caracteristicas
    FROM autos a
    LEFT JOIN auto_caracteristicas ac ON a.id = ac.auto_id
    LEFT JOIN caracteristicas c ON ac.caracteristica_id = c.id
    LEFT JOIN auto_imagen ai ON a.id = ai.auto_id
    LEFT JOIN imagenes i ON ai.imagen_id = i.id
    GROUP BY a.id;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("resutados" + results);

        const autos = results.map(auto => {
           
            const imagenBase64 = auto.imagen_data
                ? auto.imagen_data.toString('base64')
                : null;
          
            
            const descripcion = auto.caracteristicas.split('||');
           

            return {
                id: auto.id,
                nombre: auto.nombre,
                precio: auto.precio,
                imagenNombre: auto.imagen_nombre,
                descripcion:descripcion,
                imagen: {
                    data: imagenBase64,
                    tipo: auto.imagen_tipo,
                }
            };
        });

        res.json(autos);
    });
});

module.exports = router;