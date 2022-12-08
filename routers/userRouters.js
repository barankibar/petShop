const express = require("express");

const userController = require("../controllers/userController");
const userCreationMiddleware = require("../middlewares/userCreationMiddleware");

const router = express.Router();

router.post(
  "/signup",
  userCreationMiddleware.checkExistUser,
  userController.signUp
);

module.exports = router;
