const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ 
        status: 108,
        message: "Token tidak valid atau kadaluarsa",
        data: null
       });
    }
           jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
            return res.status(403).json({ 
              status: 108,
              message: "Token tidak valid atau kadaluarsa",
              data: null
             });
            }
            req.user = user.email;
        });
  } catch (err) {
    res.status(403).json({ 
        status: 108,
        message: "Invalid Signature",
        data: null
       });
  }

  next();
};