const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require('email-validator');
const util = require("../utils/util");


exports.userRegister = async (req, res) => {
  try {
    let { email, password, first_name, last_name } = req.body;

    let isEmail = validator.validate(email);

    if (!isEmail) {
        util.setError(500, 'Email is not valid. Please try again!');
        return util.send(res);
    }

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email
    ]);

    const registerDate = new Date().toISOString();
    if (user.rows.length > 0) {
      res.status(400).json({
        status: 103,
        message: 'An account with that email address already exists!'
      });
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          util.setError(500, 'Error when hashpassword');
          return util.send(res);
        } else {
          await pool.query(
            "INSERT INTO users (email, password, first_name, last_name, registered_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [email, hashedPassword, first_name, last_name, registerDate]
          );
          util.setSuccess(200, 'Registration Success!', null);
          return util.send(res);
          
        }
       
      });
    }
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let isEmail = validator.validate(email);
    if (!isEmail) {
      util.setError(500, 'Email is not valid. Please try again!');
      return util.send(res);
  }

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0) {
      util.setError(404, "An account with that email doesn't exist!");
      return util.send(res);
    } else {
      bcrypt.compare(password, user.rows[0].password, (err, validPassword) => {
        if (err) {
          util.setError(401, "Email or password is incorrect");
          return util.send(res);
        } else if (validPassword) {
          const token = jwtGenerator(user.rows[0].email);

          res.json({
            message: "Login successfully!",
            data:{
                token
            }
          });
        } else {
          util.setError(401, "Email or password is incorrect");
          return util.send(res);
        }
      });
    }
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
};

exports.getProfile = async (req, res) => {
    try {
        const email = req.user;
        const getProfile = await pool.query(`SELECT email, first_name, last_name, profile_image FROM users WHERE email=$1`, [email]);
        const dataProfile = getProfile.rows[0];
        if (dataProfile) {
          util.setSuccess(200, "Success", dataProfile);
          return util.send(res);
        }
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
    }
  };

exports.updateProfile = async (req, res) => {
    try {
        const email = req.user;
        const updateData = await pool.query(`UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3
            RETURNING email, first_name, last_name, profile_image`, [req.body.first_name, req.body.last_name, email]);

        const dataUpdated = updateData.rows[0];
        if (dataUpdated) {
              util.setSuccess(200, "Success", dataUpdated);
              return util.send(res);
        }
      } catch (error) {
          util.setError(400, error);
          return util.send(res);
      }
  };

// exports.updateProfileImage = async (req, res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }

//     Image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fs.readFileSync(
//         __basedir + "/resources/static/assets/uploads/" + req.file.filename
//       ),
//     }).then((image) => {
//       fs.writeFileSync(
//         __basedir + "/resources/static/assets/tmp/" + image.name,
//         image.data
//       );

//       return res.send(`File has been uploaded.`);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };