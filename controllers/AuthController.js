const { emailValidator } = require("../constants/Validator");
const Users = require("../models/UserModel");
const md5 = require("md5");

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  console.log(req.body);
  try {
    if (!emailValidator) {
      return res.json({
        status: 400,
        message: "Invalid Email Address",
      });
    }
    const userByUserEmail = await Users.findOne({ email: email });
    if (userByUserEmail) {
      return res.status(200).json({
        statusCode: 200,
        message: "Email Already Exists",
      });
    }
    password = md5(password);
    const newUser = new Users({ name, email, password });
    newUser
      .save()
      .then((result) => {
        return res.status(201).json({
          statusCode: 201,
          message: "User created successfully",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
      });
  } catch {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

module.exports = { registerUser };
