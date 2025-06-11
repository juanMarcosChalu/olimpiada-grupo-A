-- Insertar paquetes
INSERT INTO paquetes (nombre, descripcion, precio_total, fecha_inicio, fecha_fin) VALUES
('Paquete Caribe', 'Viaje completo al Caribe con hotel, vuelo y auto', 1500.00, '2025-07-01', '2025-07-15'),
('Aventura Patagonia', 'Estadía y vuelos a la Patagonia', 2000.00, '2025-08-10', '2025-08-20');

-- Insertar alquileres de autos
INSERT INTO alquileres_autos (nombre, descripcion, empresa, precio, fecha_inicio, fecha_fin) VALUES
('Auto compacto', 'Auto económico para dos personas', 'RentCars', 200.00, '2025-07-01', '2025-07-15'),
('SUV familiar', 'SUV para 5 personas', 'AutoRental', 350.00, '2025-08-10', '2025-08-20');

-- Insertar pasajes aéreos
INSERT INTO pasajes_aereos (aerolinea, origen, destino, fecha_salida, fecha_llegada, precio) VALUES
('Aerolíneas Argentinas', 'Buenos Aires', 'Cancún', '2025-07-01', '2025-07-01', 800.00),
('LATAM', 'Buenos Aires', 'El Calafate', '2025-08-10', '2025-08-10', 1200.00);

-- Insertar estadías
INSERT INTO estadias (hotel_nombre, ubicacion, fecha_checkin, fecha_checkout, precio_total) VALUES
('Hotel Caribe Beach', 'Cancún', '2025-07-01', '2025-07-15', 500.00),
('Hostería Patagonia', 'El Calafate', '2025-08-10', '2025-08-20', 600.00);

-- Asociar componentes al paquete Caribe
INSERT INTO paquete_componentes (paquete_id, tipo_componente, componente_id) VALUES
(1, 'auto', 1),
(1, 'vuelo', 1),
(1, 'estadia', 1);

-- Asociar componentes al paquete Patagonia
INSERT INTO paquete_componentes (paquete_id, tipo_componente, componente_id) VALUES
(2, 'auto', 2),
(2, 'vuelo', 2),
(2, 'estadia', 2);
