const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  term: String,
  when: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', SearchSchema);