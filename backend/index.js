// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

const paquetesRoutes = require('./rutas/paquetes');
const registrarRoutes = require('./rutas/usuario');
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // URL del front
  credentials: true // <- para permitir cookies
}));

app.use(session({
  secret: 'claveSuperMegaSecreta', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));
app.use('/paquetes', paquetesRoutes);
app.use('/usuario', registrarRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
