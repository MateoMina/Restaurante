
const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

const Pais = mongoose.model('coll_paises', paisSchema);

module.exports = Pais;

