// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const mercadopagoRoutes = require("./mercadopagoserver");
const paquetesRoutes = require('./rutas/paquetes');
const registrarRoutes = require('./rutas/usuario');
const autosRoutes = require('./rutas/autos');
const vuelosRoutes = require("./rutas/vuelos");
const alojamientosRoutes= require("./rutas/alojamientos");
const carritoRoutes = require("./rutas/carrito");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
  origin: ['https://524b1cba-194b-45f4-8cd4-b359a0dbd23c-00-18uuebkff7yon.kirk.replit.dev'], // URL del front
  credentials: true // <- para permitir cookies
}));

app.use(session({
  secret: 'claveSuperMegaSecreta', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 ,// 1 día
    secure:false,
  }
}));
app.use('/paquetes', paquetesRoutes);
app.use('/usuario', registrarRoutes);
app.use('/autos', autosRoutes);
app.use('/vuelos', vuelosRoutes);
app.use("/alojamientos",alojamientosRoutes);
app.use("/mercadopago", mercadopagoRoutes);
app.use("/carrito",carritoRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


///////////////////

const { soloLogueados } = require('./middlewar/authmiddlewar.js');
app.get('/dashboard', soloLogueados, (req, res) => {
  res.json({
    nombre: req.session.usuario.nombre,
  });
});
const path = require('path');

// Servir archivos estáticos del frontend (build de Vite)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Solo enviar index.html para rutas que NO empiecen con /api ni otros prefijos backend
app.get(/^\/(?!paquetes|usuario|autos|vuelos|alojamientos|mercadopago|carrito).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});




