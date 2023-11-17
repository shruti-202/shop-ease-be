const express = require("express");
const { registerUser, loginUser, getUsers} = require("../controllers/AuthController");
const passport = require('passport');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/get-users", passport.authenticate('jwt',{session: false}), getUsers)

module.exports = router;
