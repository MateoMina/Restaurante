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

// app.use((req, res, next) => {
// res.setHeader("Access-Control-Allow-Origin", "https://parcial3-ggag.vercel.app");
// res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
// );
// next();
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
