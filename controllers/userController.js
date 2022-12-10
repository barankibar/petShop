const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");

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
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      bcrypt.compare(password, user.password, (err, same) => {
        if (!same) {
          res.redirect("/user/login");
        }
        console.log(same);
        console.log(email, password);

        res.status(200).redirect("/");
      });
    }).clone((err) => console.error(err));
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
