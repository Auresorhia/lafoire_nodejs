const express = require('express');
const router = express.Router();
const articleModel = require('../models/articles.model');
const avisModel = require('../models/avis.model');

//Créer un article
router.post('/add', async (req, res) => {
  try {
    const article = await articleModel.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Lire tous les articles
router.get('/get/all', async (req, res) => {
  try {
    const articles = await articleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Lire un article par son ID
router.get('/get/:id', async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id).populate('avis');
    if (!article){
       return res.status(404).json({ message: 'Article non trouvé' }); 
    }else{
        res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Modifier un article
router.put('/update/:id', async (req, res) => {
  try {
    const updatedArticle = await articleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle){
        return res.status(404).json({ message: 'Article non trouvé' });
    }else{
        res.status(200).json(updatedArticle);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Supprimer un article
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedArticle = await articleModel.findByIdAndDelete(req.params.id);
    if (!deletedArticle){
       return res.status(404).json({ message: 'Article non trouvé' }); 
    }else{
       res.status(200).json({ message: 'Article supprimé avec succès' }); 
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Récupérer les avis d’un article
router.get('/get/:id/avis', async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id).populate('avis');
    if (!article){
       return res.status(404).json({ message: 'Article non trouvé' }); 
    }else{
       res.status(200).json(article.avis); 
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Trier les articles par prix
router.get('/sort/price', async (req, res) => {
  try {
    const articles = await articleModel.find().sort({ price: 1 }); // 1 = croissant, -1 = décroissant
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Trier les articles par note


module.exports = router;

