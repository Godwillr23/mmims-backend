const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ProjId: { type: Number, required: true},
  Firstname: { type: String, required: true},
  Lastname: { type: String, required: true},
  UserRole: { type: String, required: true},
  // UserAssignedTo: { type: Number},
  // ProjectAssignedTo: { type: Number},
  // LocationAssignedTo: { type: Number},
  ActiveStatus: { type: Boolean},
  IDno: { type: String, required: true, unique: true },
  CellNo: { type: String, required: true, unique: true },
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
