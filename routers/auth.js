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

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureFlash: false,
    successFlash: false,
  })
);

module.exports = router;
