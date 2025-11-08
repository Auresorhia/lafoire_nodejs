// importation du module express
const express = require('express');

// création d'un router express
const router = express.Router();

// importation du modèle User
const userModel = require('../models/users.model');


//Ajouter un utilisateur
router.post('/add', async (req, res) => {
    try {
        const { prenom, avatar, email, isActive, password, role } = req.body;
        const newUser = await userModel.create(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
});

//Lire tous les utilisateurs
router.get('/get/all', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

//Lire un utilisateur par ID
router.get('/get/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user){
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }else{
           res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});



module.exports = router;
