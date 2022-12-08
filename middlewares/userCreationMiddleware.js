const User = require("../models/UserModel");

const checkExistUser = (req, res, next) => {
  const user = User.find({ email: req.body.email });
  if (!user) {
    res.sendStatus(400);
  }

  next();
};

module.exports = {
  checkExistUser,
};
