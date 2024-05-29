// models/Sale.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    nota: { type: String },
    total: { type: Number, required: true }
});

const saleSchema = new mongoose.Schema({
    mesero: { type: String, required: true },
    mesa: { type: String, required: true },
    estado: { type: String, required: true },
    productos: [productSchema],
    totalventa: { type: Number, required: true }
});

module.exports = mongoose.model('Sale', saleSchema);
