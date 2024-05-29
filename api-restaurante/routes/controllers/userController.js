// controllers/userController.js
const express = require('express');
const User = require('../models/User');

const login = async (req, res) => {
    const { user: username, password } = req.body;

    try {
        const userFound = await User.findOne({ user: username });
        if (userFound) {
            if (userFound.password === password) {
                res.json(userFound);
            } else {
                res.json({ error: "Contraseña incorrecta" });
            }
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al buscar usuario" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

const getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userFound = await User.findById(userId);
        if (userFound) {
            res.json(userFound);
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al buscar usuario" });
    }
}

const createUser = async (req, res) => {
    const { user, password, role, activate } = req.body;
    try {
        const userExists = await User.findOne({ user });
        if (userExists) {
            return res.status(400).json({ error: "Ya existe un usuario con ese nombre" });
        }

        const newUser = new User({ user, password, role, activate });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Error al crear usuario" });
    }
}

const deleteUser = async (req, res) => {
    const userToDelete = req.params.user;
    try {
        const result = await User.deleteOne({ user: userToDelete });
        if (result.deletedCount > 0) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
}

const updateUser = async (req, res) => {
    const username = req.body.user;
    const updatedUserData = req.body;

    try {
        const userToUpdate = await User.findOne({ user: username });
        if (userToUpdate) {
            Object.assign(userToUpdate, updatedUserData);
            await userToUpdate.save();
            res.json(userToUpdate);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
}

module.exports = {
    login,
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}
