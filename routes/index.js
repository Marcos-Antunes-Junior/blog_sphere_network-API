const express = require("express");
const router = express.Router();

router.use("/google", require("./google"));
router.use('/auth', require('./users'));
router.get("/", (req, res) => {
  res.send("Hello! This is the Blog Sphere Network API!");
});

module.exports = router;
