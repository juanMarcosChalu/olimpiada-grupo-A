// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const path = require('path');
const mercadopagoRoutes = require("./mercadopagoserver");
const paquetesRoutes = require('./rutas/paquetes');
const registrarRoutes = require('./rutas/usuario');
const autosRoutes = require('./rutas/autos');
const vuelosRoutes = require("./rutas/vuelos");
const alojamientosRoutes = require("./rutas/alojamientos");
const carritoRoutes = require("./rutas/carrito");
const { soloLogueados } = require('./middlewar/authmiddlewar.js');
require("dotenv").config();
// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
  origin: ['http://localhost:5173/'],
  credentials: true
}));
// Agrega esto temporalmente en tu index.js

// Configuración de sesión
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Todas las rutas API primero
app.use('/paquetes', paquetesRoutes);
app.use('/usuario', registrarRoutes);
app.use('/autos', autosRoutes);
app.use('/vuelos', vuelosRoutes);
app.use("/alojamientos", alojamientosRoutes);
app.use("/mercadopago", mercadopagoRoutes);
app.use("/carrito", carritoRoutes);

// Ruta del dashboard
app.get('/dashboard', soloLogueados, (req, res) => {
  res.json({
    nombre: req.session.usuario.nombre,
  });
});


app.use(express.static(path.join(__dirname, '../frontend/dist'), {
  index: false 
}));

const frontendRoutes = [
  '/',
  '/carritoPage',
  '/resultadosvuelos',
  '/login',
  '/registro',
  '/vuelos',
  '/alojamientos',
  '/contacto',
  '/perfil',
  '/paquetes',
  '/aventura',
  '/romantico',
  '/familiar',
  '/relax',
 '/vuelos/',
  '/naturaleza',
  '/cultural',
  '/notificaciones',
  '/favoritos',
  '/alquileres',
  '/alojamiento',
  '/politica-privacidad',
  '/terminos-condiciones',
  'proteccion',
  '/admin',
  '/admin/compras',
  '/admin/usuarios',
  '/admin/asistencia',
  '/admin/paquetes',
  '/nosotros'
];

frontendRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
});


app.get(/^\/(?!paquetes|usuario|autos|vuelos|alojamientos|mercadopago|carrito).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT =   3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});