const express = require('express');
const router = express.Router();

// Ruta GET que retorna un mensaje "hola"
router.get('/', (req, res) => {
    res.json({ message: 'hola' });
});

module.exports = router;

