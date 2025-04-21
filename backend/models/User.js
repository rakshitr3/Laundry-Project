const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: false, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  district: { type: String },
  pinCode: { type: String },
  state: { type: String },
  address: { type: String },
}, {
  timestamps: true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;


  

