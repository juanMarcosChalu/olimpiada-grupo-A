const express = require('express');
const router = express.Router();
const db = require('../db');
const session = require('express-session');

router.get('/obtenerProductos/:idCliente', (req, res) => {
  console.log(req.params);
  
    const { idCliente } = req.params;
    console.log(idCliente+"alkfgadkgjsdj");
    
    const query = ` 
  SELECT 
    c.*,  -- Esto selecciona todas las columnas de la tabla carrito
    CASE 
        WHEN c.tipoProducto = 'paquete' THEN (
            SELECT JSON_OBJECT(
                'id', p.id,
                'tipo', p.tipo,
                'titulo', p.titulo,
                'precio', p.precio,
                'resumen', p.resumen,
                'detalleServicios', p.detalleServicios,
                'imagenes', IFNULL((
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'nombre', i.nombre,
                            'imagen', i.imagen,
                            'tipo_mime', i.tipo_mime
                        )
                    )
                    FROM paquete_imagen pi
                    JOIN imagenes i ON pi.imagen_id = i.id
                    WHERE pi.paquete_id = p.id
                ), JSON_ARRAY())
            )
            FROM paquetes p
            WHERE p.id = c.productoID
            LIMIT 1
            
        )
        WHEN c.tipoProducto = 'vuelo' THEN (
            SELECT JSON_OBJECT(
                'id', v.id,
                'origen', v.origen_ida,
                'destino', v.destino_ida,
                'fecha_salida', v.fecha_ida,
                'fecha_llegada', v.fecha_vuelta,
                'aerolinea', v.aerolinea,
                'precio', v.precio,
                'duracion', v.duracion_ida
            )
            FROM vuelos v
            WHERE v.id = c.productoID
            LIMIT 1
        )
        WHEN c.tipoProducto = 'alojamiento' THEN (
            SELECT JSON_OBJECT(
                'id', a.id,
                'nombre', a.nombre,
                'descripcion', a.descripcion,
                'precio_total', a.precio_total,
                'noches', a.noches,
                'servicios', JSON_OBJECT(
                    'wifi', a.wifi,
                    'cocina', a.cocina,
                    'calefaccion', a.calefaccion,
                    'mascotas', a.mascotas,
                    'piscina', a.piscina
                )
            )
            FROM alojamientos a
            WHERE a.id = c.productoID
            LIMIT 1
        )
        WHEN c.tipoProducto = 'alquilerAuto' THEN (
            SELECT JSON_OBJECT(
                'id', a.id,
                'nombre', a.nombre,
                'precio', a.precio_por_dia,
                'descripcion', a.descripcion,
                'imagen_principal', IFNULL((
                    SELECT JSON_OBJECT(
                        'nombre', i.nombre,
                        'tipo_mime', i.tipo_mime
                    )
                    FROM auto_imagen ai
                    JOIN imagenes i ON ai.imagen_id = i.id
                    WHERE ai.auto_id = a.id
                    LIMIT 1
                ), JSON_OBJECT()),
                'caracteristicas', IFNULL((
                    SELECT JSON_ARRAYAGG(c.nombre)
                    FROM auto_caracteristicas ac
                    JOIN caracteristicas c ON ac.caracteristica_id = c.id
                    WHERE ac.auto_id = a.id
                ), JSON_ARRAY())
            )
            FROM autos a
            WHERE a.id = c.productoID
            LIMIT 1
        )
        ELSE NULL
    END AS producto_info
FROM 
    carrito c
WHERE  c.idCliente = ?;`;


    db.query(query,idCliente, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const carritoProductos=results;
        console.log("resutados"+results);
        res.json(carritoProductos);
    });
});

module.exports = router;
//hace rla consulta para agreagar un producto, tambien para quitar despues, por cierto que tengamos hasta el 7 ahora es una sorpresa muy grande y buena en parte por que queria completar lo que me faltaba, aunque ahora tambien me da pereza por que voy a tener que pensar mas cosas que hacer :/ 
router.post('/anadirProducto', (req, res) => {
  const { userId, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado } = req.body;
  
  console.log(req.body);
  
  // Validar que el tipo de producto sea uno de los permitidos
  const tiposPermitidos = ['paquete', 'vuelo', 'alojamiento', 'alquilerAuto'];
  if (!tiposPermitidos.includes(tipoProducto)) {
    return res.status(400).json({ error: 'Tipo de producto no válido' });
  }

  // Consulta para insertar el producto en el carrito
  const insertQuery = `
    INSERT INTO carrito 
    (idCliente, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.query(
    insertQuery, 
    [userId, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado],
    (err, result) => {
      if (err) {
        console.error('Error al añadir producto al carrito:', err);
        return res.status(500).json({ error: 'Error al añadir producto al carrito' });
      }
      
      res.json({ 
        success: true, 
        message: 'Producto añadido al carrito correctamente',
        carritoId: result.insertId 
      });
    }
  );
});