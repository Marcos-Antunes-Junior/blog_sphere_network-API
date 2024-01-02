const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('google', {
    scope: ['profile'],
}))

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    console.log('Success! User logged in.');

 
    res.redirect('http://localhost:3000')
} )

module.exports = router;