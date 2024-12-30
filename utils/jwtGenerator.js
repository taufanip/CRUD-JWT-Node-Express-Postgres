const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (email) => {
  const payload = {
    email: email,
  };
  

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
};