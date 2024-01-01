const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  fullName: String,
  userName: String,
  phone: String,
  email: String,
  salary: String,
  position: String,
  role: String,
  authMethod: String,
  password: { type: String, selected: false },
  confirmPassword: String,
  profilePicture: {
    type: String,
    default: 'defaultProfile.jpeg',
  },
});

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

schema.methods.checkPasswordMatch = async function (
  password,
  candidatePassword
) {
  return await bcrypt.compare(password, candidatePassword);
};
exports.Signup = mongoose.model('user', schema);
