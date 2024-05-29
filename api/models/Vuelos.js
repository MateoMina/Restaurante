const mongoose = require("mongoose");

const vuelos = new mongoose.Schema({
  lugarOrigen: {
    type: String,
    required: true,
  },
  lugarDestino: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
});

const Vuelos = mongoose.model("coll_viajes", vuelos);

module.exports = Vuelos;
