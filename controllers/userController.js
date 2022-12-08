const asyncHandler = require("express-async-handler");
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

module.exports = {
  signUp,
};
