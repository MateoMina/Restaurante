const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/restaurant.routes.js');
const cors = require('cors');
const connectDB = require('./routes/database/db.js'); // Importamos la función de conexión a la base de datos
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const app = express();

// Conectar a la base de datos
connectDB();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());
app.use('/v1/restaurant', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
