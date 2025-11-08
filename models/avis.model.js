const mongoose = require('mongoose');

const avisSchema = mongoose.Schema(
    {
        rating: { // Note attribuée à l'article
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        comment: { // Commentaire laissé par l'utilisateur
            type: String,
            required: true
        },
        user: { // Référence à l'utilisateur qui a posté l'avis
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article: { // Référence à l'article concerné
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        }
    },
    {
        timestamps: true // createdAt et updatedAt automatiquement
    }
);

module.exports = mongoose.model('Avis', avisSchema);
