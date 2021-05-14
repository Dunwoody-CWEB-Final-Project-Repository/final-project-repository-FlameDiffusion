var express = require('express');
var router = express.Router();
const db = require('../db/index');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

async function register(username, password) {
  try {
      const salt = await bcrypt.genSalt(10);
      const ePassword = await bcrypt.hash(password,salt);
      const regUser = await db.query("INSERT INTO users (username, password) VALUES(?,?)", [username, ePassword] );
  } catch (error){
    console.log(error)
  }
}

router.get('/', function (req, res) {
  res.render('createAccount',)
});

router.post('/',
  [
    check('username')
      .notEmpty()
      .withMessage('Please fill in your username.')
      .isLength({ min: 3 })
      .withMessage('username must be 3 or more character')
      .escape()
      .not().contains(['SELECT', 'INSERT', 'UPDATE'], { ignoreCase: true })
      .withMessage("Invalid entry, contains blacklisted words!")
      .custom(async (username, { req }) => {
        const checkUser = await db.query("SELECT username FROM users WHERE username=?", username)
        console.log(checkUser[0].length);
        if (checkUser[0].length) {
          throw new Error('Username is used already')
        }
        return true;
      }),
    check('password')
      .notEmpty()
      .withMessage('Please fill in your password.')
      .isLength({ min: 6 })
      .withMessage('password must be 6 or more character')
      .escape()
      .not().contains(['SELECT', 'INSERT', 'UPDATE'], { ignoreCase: true })
      .withMessage("Invalid entry, contains blacklisted words!"),
    check('repeatPassword')
      .custom(async (repeatPassword, { req }) => {
        if (repeatPassword != req.body.password) {
          throw new Error('your password does not match')
        }
        return true;
      }),


  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const alert = errors.array();
      res.render('createAccount', alert)
    } else {
      
      await register(req.body.username, req.body.password);
      console.log("restration successful");
      res.redirect('/login');
    }


  });

module.exports = router;
