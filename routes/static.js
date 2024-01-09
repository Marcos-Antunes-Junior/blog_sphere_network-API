const express = require('express');
const router = express.Router();

//static Routes

router.use(express.static("public"));
router.use('/profile-pics', express.static(__dirname + 'public/profile-pics'));

module.exports = router;