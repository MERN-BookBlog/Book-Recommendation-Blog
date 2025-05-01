const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);         
  const hashed = await bcrypt.hash(plainPassword, salt); 
  return hashed;
};

module.exports = hashPassword;
