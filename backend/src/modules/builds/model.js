const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Build', buildSchema);
