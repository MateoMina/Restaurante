// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    activate: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Product', productSchema);
