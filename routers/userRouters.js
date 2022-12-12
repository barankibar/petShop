const express = require("express");
const passport = require("passport");

const userController = require("../controllers/userController");
const userCreationMiddleware = require("../middlewares/userCreationMiddleware");

const router = express.Router();

router.post(
  "/signup",
  userCreationMiddleware.checkExistUser,
  userController.signUp
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: false,
  })
);

module.exports = router;
