const express = require('express');
const router = express.Router();
const db = require('../db');
const session = require('express-session');

router.get('/obtenerProductos/:idCliente', (req, res) => {

  
    const { idCliente } = req.params;
    
    
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
                ),
                'imagenes', IFNULL((
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'nombre', i.nombre,
                            'imagen', i.imagen,
                            'tipo_mime', i.tipo_mime
                        )
                    )
                    FROM alojamiento_imagen ai
                    JOIN imagenes i ON ai.imagen_id = i.id
                    WHERE ai.alojamiento_id = a.id
                ), JSON_ARRAY()),
                'imagen_principal', IFNULL((
                    SELECT JSON_OBJECT(
                        'nombre', i.nombre,
                        'imagen', i.imagen,
                        'tipo_mime', i.tipo_mime
                    )
                    FROM alojamiento_imagen ai
                    JOIN imagenes i ON ai.imagen_id = i.id
                    WHERE ai.alojamiento_id = a.id
                    LIMIT 1
                ), JSON_OBJECT())
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
                        'imagen', i.imagen,
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
        console.log(results);
        const carritoProductos=results;

        res.json(carritoProductos);
    });
});

module.exports = router;
//hace rla consulta para agreagar un producto, tambien para quitar despues, por cierto que tengamos hasta el 7 ahora es una sorpresa muy grande y buena en parte por que queria completar lo que me faltaba, aunque ahora tambien me da pereza por que voy a tener que pensar mas cosas que hacer :/ 
router.post('/anadirProducto', (req, res) => {
  const { userId, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado,fechaInicio,fechaFin,cantPersonas} = req.body;
  

  
  // Validar que el tipo de producto sea uno de los permitidos
  const tiposPermitidos = ['paquete', 'vuelo', 'alojamiento', 'alquilerAuto'];
  if (!tiposPermitidos.includes(tipoProducto)) {
    return res.status(400).json({ error: 'Tipo de producto no válido' });
  }

  // Consulta para insertar el producto en el carrito
  const insertQuery = `
    INSERT INTO carrito 
    (idCliente, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado,fechaInicio, fechaFin, cantPersonas) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(
    insertQuery, 
    [userId, tipoProducto, productoID, nombreAsignado, telefonoAsignado, emailAsignado, fechaInicio, fechaFin,cantPersonas],
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
//eliminar 
router.delete('/eliminarProducto/:id/:userid', (req, res) => {
  const { id,userid } = req.params;

  // Consulta para eliminar el producto del carrito
  const deleteQuery = 'DELETE FROM carrito WHERE id = ? AND idCliente = ?';

  db.query(deleteQuery, [id,userid], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto del carrito:', err);
      return res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    res.json({ success: true, message: 'Producto eliminado del carrito correctamente' });
  });
});

//editar fecgha de inicio y fin
router.put('/editarFechas/:id/:userid', (req, res) => {
    const { id, userid } = req.params;
    const { fechaInicio, fechaFin } = req.body;
    console.log(`ID: ${id}, UserID: ${userid}, Fecha Inicio: ${fechaInicio}, Fecha Fin: ${fechaFin}`);

    // Validar que las fechas no sean nulas o vacías
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Fecha de inicio y fin son requeridas' });
    }

    // Validar formato ISO (YYYY-MM-DD)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(fechaInicio) || !isoDateRegex.test(fechaFin)) {
        return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    }

    // Validar que fechaInicio <= fechaFin
    if (fechaInicio > fechaFin) {
        return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la fecha fin' });
    }

    // Ejecutar la consulta (envía los strings ISO directamente)
    const updateQuery = 'UPDATE carrito SET fechaInicio = ?, fechaFin = ? WHERE id = ? AND idCliente = ?';
    
    db.query(updateQuery, [fechaInicio, fechaFin, id, userid], (err, result) => {
        if (err) {
            console.error('Error al editar fechas:', err);
            return res.status(500).json({ error: 'Error interno al actualizar fechas' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        res.json({ success: true, message: 'Fechas actualizadas correctamente' });
    });
});