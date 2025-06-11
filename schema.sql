-- Crear tabla paquetes
CREATE TABLE paquetes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio_total DECIMAL(10,2),
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Crear tabla alquileres_autos
CREATE TABLE alquileres_autos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    empresa VARCHAR(100),
    precio DECIMAL(10,2),
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Crear tabla pasajes_aereos
CREATE TABLE pasajes_aereos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aerolinea VARCHAR(100),
    origen VARCHAR(100),
    destino VARCHAR(100),
    fecha_salida DATE,
    fecha_llegada DATE,
    precio DECIMAL(10,2)
);

-- Crear tabla estadias
CREATE TABLE estadias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_nombre VARCHAR(100),
    ubicacion VARCHAR(100),
    fecha_checkin DATE,
    fecha_checkout DATE,
    precio_total DECIMAL(10,2)
);

-- Crear tabla paquete_componentes
CREATE TABLE paquete_componentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paquete_id INT NOT NULL,
    tipo_componente ENUM('auto', 'vuelo', 'estadia') NOT NULL,
    componente_id INT NOT NULL,
    FOREIGN KEY (paquete_id) REFERENCES paquetes(id)
);
