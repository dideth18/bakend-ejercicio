const express = require('express');
require('dotenv').config();
const cors = require('cors');
const productRoutes = require('../routes/productRoutes');



// Inicializar la aplicación Express
const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API CRUD con PostgreSQL está funcionando!');
});

// Usar las rutas de productos
app.use('/api', productRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});