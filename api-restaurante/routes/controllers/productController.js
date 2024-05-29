// controllers/productController.js
const Product = require('../models/product');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
}

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { name, price, activate } = req.body;

        const productExists = await Product.findOne({ name });
        if (productExists) {
            return res.status(400).json({ error: "Ya existe un producto con ese nombre" });
        }

        const newProduct = new Product({ name, price, activate });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Error al crear producto" });
    }
}

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const productName = req.params.name;
        const result = await Product.deleteOne({ name: productName });
        if (result.deletedCount > 0) {
            res.json({ message: "Producto eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar producto" });
    }
}

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { name, price, activate } = req.body;
        const updatedProduct = await Product.findOneAndUpdate(
            { name },
            { price, activate },
            { new: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar producto" });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
}
