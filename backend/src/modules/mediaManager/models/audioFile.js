const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

/**
 * *Esquema dedicado al usuario. Tiene como campo irrepetible el 'user'.
 */
const AudioFileSchema = new Schema({
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.plugin(findOrCreate);

UserSchema.methods.encryptPassword = async (password) => {
  let pass = await bcrypt.hash(password, 2);
  return pass;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
