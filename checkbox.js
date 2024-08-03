const mongoose = require('mongoose');

const checkboxSchema = new mongoose.Schema({
  id: String,
  checked: Boolean,
});

module.exports = mongoose.model('Checkbox', checkboxSchema);
