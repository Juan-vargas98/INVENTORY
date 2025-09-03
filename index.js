const express = require('express');
const { getConnection } = require('./db/connect-mongo-db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
getConnection();

// Registrar rutas
app.use('/api/marcas', require('./routes/marca'));
app.use('/api/estados', require('./routes/estadoEquipo'));
app.use('/api/inventarios', require('./routes/inventario'));
app.use('/api/tipos', require('./routes/tipoEquipo'));
app.use('/api/usuarios', require('./routes/usuario'));

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
