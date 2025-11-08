const express = require('express');
const router = express.Router();
const avisModel = require('../models/avis.model');
const articleModel = require('../models/articles.model');

// Ajouter un avis
router.post('/add', async (req, res) => {
  try {
    const avis = await avisModel.create(req.body);
    await articleModel.findByIdAndUpdate(req.body.article, { $push: { avis: avis._id } });
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Supprimer un avis
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedAvis = await avisModel.findByIdAndDelete(req.params.id);
    if (!deletedAvis){
      return res.status(404).json('Avis non trouvé');  
    }else{
        await articleModel.findByIdAndUpdate(deletedAvis.article, { $pull: { avis: deletedAvis._id } });
    }

    res.status(200).json({ message: 'Avis supprimé avec succès' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
