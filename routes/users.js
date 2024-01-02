const express = require("express");
const router = express.Router();
const passport = require("passport");

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


module.exports = router;
