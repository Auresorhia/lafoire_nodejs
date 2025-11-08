const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    avis: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Avis'
    }],
    picture: {
      type: String,
      required: true
    },
    img1: {
      type: String
    },
    img2: {
      type: String
    },
    img3: {
      type: String
    },
    img4: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
