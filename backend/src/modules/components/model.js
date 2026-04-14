const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['CPU', 'MOTHERBOARD', 'RAM', 'GPU', 'PSU', 'STORAGE', 'CASE'],
    required: true,
  },
  specs: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Component', componentSchema);
