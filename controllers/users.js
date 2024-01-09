const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = db.users;

const createAccount = async (req, res) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  } catch (err) {
    console.log(err);
  }
  const users = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    picture: req.body.picture,
  });

  try {
    const existingUser = await Users.findOne({ email: req.body.email })
    if(existingUser) {
      return res.status(400).json({ errors: ["Email exists. Please, log in or use a different email"] })
    }
    await users
    .save()
    .then((data) => {
      return res.status(201).send({ message: 'Account created. Please log in.', data});
    })

  }catch (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error ocurred while creating user.",
      });
    };
};

const userLogin = async (req, res) => {

  const { email, password } = req.body;
  if(!email || !password) {
  return res.status(400).send({ message: 'All fields are mandatory!'})
  }

  const user = await Users.findOne({ email });
  try {
    if (user && (await bcrypt.compare(password, user.password))) {
    delete user.password;
    const accessToken = jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 * 1000}
    );
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });
    console.log(`User ${ email } logged in!`);
    return res.status(200).json({ token: accessToken, message: 'Success!' })
    
  } else {
    return res.status(401).json({ message: 'Email or password is not valid.'})
  }
  } catch (err) {
    console.log(err)
    res.status(401)
    throw new Error(err);
  }

}



module.exports = {
    createAccount, userLogin
}