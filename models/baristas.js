const mongoose = require('mongoose');

const baristaSchema = mongoose.Schema({
  name: {type: String, required: true},
  drink: {type: String, required: true},
  funFact: {type: String, required: true},
  photo: {type: String, required: true}
});

module.exports = mongoose.model('Barista', baristaSchema);
