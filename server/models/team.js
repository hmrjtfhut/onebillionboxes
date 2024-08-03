const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  color: String,
});

module.exports = mongoose.model('Team', teamSchema);
