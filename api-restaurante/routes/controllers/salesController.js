// controllers/salesController.js
const Sale = require('../models/sales');

// Obtener todas las ventas
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener ventas" });
    }
}

// Crear una nueva venta
const createSales = async (req, res) => {
    try {
        const { mesero, mesa, estado, productos, totalventa } = req.body;
        const newSale = new Sale({ mesero, mesa, estado, productos, totalventa });
        await newSale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(500).json({ error: "Error al crear orden" });
    }
}

// Actualizar una venta
const updateSale = async (req, res) => {
    try {
        const { id, mesero, mesa, estado, productos, totalventa } = req.body;
        const updatedSale = await Sale.findByIdAndUpdate(
            id,
            { mesero, mesa, estado, productos, totalventa },
            { new: true }
        );
        if (updatedSale) {
            res.json(updatedSale);
        } else {
            res.status(404).json({ error: "Orden no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar orden" });
    }
}

module.exports = {
    getAllSales,
    createSales,
    updateSale
}
