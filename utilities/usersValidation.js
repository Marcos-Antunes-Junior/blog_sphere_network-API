const { body, validationResult } = require('express-validator');
const validate = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const Users = db.users;

validate.registrationRules = () => {
    return [
        body("name")
          .trim()
          .isLength({ min: 4 })
          .withMessage("Please, provide a name."),
    
        body("email")
          .trim()
          .isEmail()
          .normalizeEmail()
          .withMessage("A valid email is required."),
    
        body("password")
          .trim()
          .isLength({ min: 8 })
          .withMessage("The password must be at least 8 characters long."),
    
        body("picture")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Please, choose a profile picture."),
      ];
}

validate.checkRegistrationData = async (req, res, next) => {
    const { name, email, password, picture } = req.body;
    let errors = [];
    errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json(errors);
        return;
    }
    next();
}

module.exports = validate;