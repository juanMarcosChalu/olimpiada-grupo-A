// index.js
const express = require('express');
const cors = require('cors');
const app = express();

const paquetesRoutes = require('./rutas/paquetes');

app.use(cors());
app.use(express.json());

app.use('/paquetes', paquetesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
