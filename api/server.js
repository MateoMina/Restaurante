const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pais = require('./models/Pais'); 
const Vuelos = require('./models/vuelos');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mateomina01:mateomina01@cluster0.fuhyb4u.mongodb.net/DB_viajes')
.then(() => console.log('Conexión a MongoDB establecida correctamente'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));


app.get('/buscarPaises', async (req, res) => {
  try {
    const paises = await Pais.find();
    res.json(paises);
  } catch (error) {
    console.error('Error al buscar países:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/crearVuelo', async (req, res) => {
  try {
    const { lugarOrigen, lugarDestino } = req.body
    const allVuelos = await Vuelos.find();

    let reservaExistente = false;
    for (const reserva of allVuelos) {
        if (reserva.lugarOrigen === lugarOrigen && reserva.lugarDestino === lugarDestino) {
            reservaExistente = true;
            break;
        }
    }

    if (reservaExistente) {
      res.json('Ya existe');
  } else {
      const createReserva = await Vuelos.create(req.body);
      // ALERTA
      res.status(200).json({ message: 'Vuelo creado exitosamente', reserva: createReserva, showAlert: true });
  }
} catch (error) {
  console.error('Error al crear el vuelo:', error);
  res.status(500).json({ message: 'Error interno del servidor' });
}
});

app.get('/obtenerVuelos', async (req, res) => {
  try {
    const vuelos = await Vuelos.find();
    res.json(vuelos);
  } catch (error) {
    console.error('Error al obtener países:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
