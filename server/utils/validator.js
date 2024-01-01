const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const { unlink } = require('fs/promises');

const password = (filed) => {
  return body(filed)
    .isLength({ min: 8 })
    .withMessage('minimum password length is 8')
    .isLength({ max: 16 })
    .withMessage('maximum password length is 16')
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      'password must contains at least 1 number, 1 # capital letter, 1 small letter, 1 special character'
    );
};

const numeric = (field, min) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must have a value`);
};

const phone = (field, min, max) => {
  return body(field)
    .isNumeric()
    .withMessage(`phone must be a number`)
    .isLength({ min })
    .withMessage(`please insert a valid phone number`)
    .isLength({ max })
    .withMessage(`please insert a valid phone number`);
};

const userName = () => {
  return body('userName')
    .isLength({ min: 4 })
    .withMessage(`user name must be greater than 3 character`)
    .isLength({ max: 50 })
    .withMessage(`user name must be less than 50 character`);
};

const confirmPassword = (field) => {
  return body(field).custom((val, { req }) => {
    if (req.body.password !== val) throw new Error('password not much');
    return true;
  });
};

const onlyEmail = (field) => {
  return body(field)
    .isEmail()
    .withMessage(`Invalid email please use the valid one`);
};

const alphaNumeric = (field, min, max) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must be greater than ${min - 1} character`)
    .isLength({ max })
    .withMessage(`${field} must be less than ${max} character`);
};

const onlyCharacter = (field, min, max, allowSpace) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must be greater than ${min - 1} character`)
    .isLength({ max })
    .withMessage(`${field} must be less than ${max} character`)
    .isAlpha('en-US', { ignore: allowSpace ? ' ' : '' })
    .withMessage(`${field} must contains only character`);
};

const email = () => {
  return body('email').isEmail().withMessage(`invalid email`);
};

const userNameUpdate = () => {
  return body('userName')
    .isAlphanumeric()
    .withMessage('in user name space is not allowed')
    .isLength({ max: 30 })
    .withMessage('maximum user name length is 30')
    .isLength({ min: 3 })
    .withMessage('user name must be greater than 2 character');
};

const emailUpdate = () => {
  return body('email').isEmail().withMessage(`invalid email`);
};

exports.signupValidator = [
  onlyCharacter('fullName', 3, 100, true),
  numeric('salary', 1),
  alphaNumeric('position', 3, 100),
  userName(),
  email(),
  phone('phone', 9, 15),
  password('password'),
  confirmPassword('confirmPassword'),
];

exports.updateInfoValidator = [
  onlyCharacter('fullName', 4, 100, false),
  onlyCharacter('position', 4, 100, false),
  onlyCharacter('city', 4, 100, true),
  emailUpdate('email'),
  userNameUpdate(),
  numeric('salary', 1),
];

exports.passwordResetValidator = [
  password('password'),
  confirmPassword('confirmPassword'),
];

exports.emailSendValidator = [
  onlyCharacter('fullName', 3, 100, true),
  onlyEmail('email'),
  alphaNumeric('description', 3, 500),
];

exports.isValidated = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files?.profilePicture !== undefined) {
      await unlink(req.files.profilePicture[0].path);
    }
    return res.status(400).json({ msg: errors.array() });
  }
  next();
};
