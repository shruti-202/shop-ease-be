const { nameValidator, emailValidator, passwordValidator } = require("../constants/Validator");
const Users = require("../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({
      statusCode: 400,
      message: "Name cannot be empty",
    });
  }
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Name should be greater than 1 and less than equal 50 characters",
    });
  }
  if (!nameValidator(name)) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Invalid Name. Format: First [Last], both start with uppercase, & contains only alphabetical characters.",
    });
  }
  if (!email) {
    return res.status(400).json({
      statusCode: 400,
      message: "Email cannot be empty",
    });
  }
  if (!emailValidator(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid Email Address",
    });
  }
  if (!password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Password cannot be empty",
    });
  }
  if (!passwordValidator(password)) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Password should have minimum of eight characters, at least 1 uppercase , lowercase , number & special character:",
    });
  }

  try {
    const userByUserEmail = await Users.findOne({ email });
    if (userByUserEmail) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email Already Exists",
      });
    }
    const userByUserPassword = await Users.findOne({ password });
    if (userByUserPassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "Password Already Exists",
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
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      statusCode: 400,
      message: "Email cannot be empty",
    });
  }
  if (!emailValidator(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid Email Address",
    });
  }
  if (!password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Password cannot be empty",
    });
  }
  if (!passwordValidator(password)) {
    return res.status(400).json({
      statusCode: 400,
      message:
        "Password should have minimum of eight characters, at least 1 uppercase , lowercase , number & special character:",
    });
  }

  try {
    const userRecord = await Users.findOne({ email });
    if (!userRecord) {
      return res.status(200).json({
        statusCode: 200,
        message: "User not found",
      });
    }
    if (email === userRecord.email && md5(password) === userRecord.password) {
      const payload = {
        username: userRecord.name,
        id: userRecord._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.status(200).json({
        statusCode: 200,
        message: "User Login Successful",
        data: `Bearer ${token}`,
      });
    }
    return res.status(403).json({
      statusCode: 403,
      message: "Incorrect Password",
    });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    Users.find()
      .then((result) => {
        return res.status(200).json({
          statusCode: 200,
          message: "Success",
          data: result,
        });
      })
      .catch(() => {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad Request",
        });
      });
  } catch (err) {
    return res.status(503).json({
      statusCode: 503,
      message: "Server Error",
    });
  }
};

module.exports = { registerUser, loginUser, getUsers };
