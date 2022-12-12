const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");
const { session } = require("passport");

const signUp = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    console.log(session.caller);
    req.session.userID = session.caller._id;
    redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

module.exports = {
  signUp,
  login,
};
