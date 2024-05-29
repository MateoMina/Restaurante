// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Otros campos según tu esquema
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
