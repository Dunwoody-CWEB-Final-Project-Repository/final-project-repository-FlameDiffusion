var express = require('express');
var router = express.Router();
const db = require('../db/index');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
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
        if (checkUser[0] == 0) {
          throw new Error('Username does not exist')
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
      .withMessage("Invalid entry, contains blacklisted words!")
      .custom(async (password, { req }) => {
        const pass = await db.query("SELECT password FROM users WHERE username=?", req.body.username);
        const strPass = Object.values(JSON.parse(JSON.stringify(pass[0])))
        const checkPass = await bcrypt.compare(password, strPass[0].password)
        if (!checkPass) {
          throw new Error('invaild password');
        }
        return true;
      }),


  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const alert = errors.array();
      res.render('login', alert)
    } else {
      console.log("login successful");
      res.redirect('/');
    }


  });

module.exports = router;
