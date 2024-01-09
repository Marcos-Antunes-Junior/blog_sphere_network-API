const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require('../controllers/users');
const usersValidation = require('../utilities/usersValidation');
const validate = require("../utilities/usersValidation");

//logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//test
router.get("/test", (req, res) => {
    res.json("Hello! This is a test");
  } )

// Create Account
router.post('/registration', validate.registrationRules(), validate.checkRegistrationData, usersController.createAccount )

// Login
router.post('/login', usersController.userLogin)


module.exports = router;
