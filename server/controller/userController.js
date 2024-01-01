const AppError = require('../utils/AppError');
const asyncCatch = require('express-async-catch');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { db } = require('../config/mysql');
const { hashSync, compareSync } = require('bcrypt');
const sendEmail = require('../utils/nodeMailer');

exports.signupHandler = asyncCatch(async (req, res, next) => {
  const {
    fullName,
    userName,
    email,
    salary,
    position,
    phone,
    authMethod,
    role,
  } = req.body;
  const password = hashSync(req.body.password, 10);
  const profilePicture = req.files.profilePicture
    ? req.files.profilePicture[0].filename
    : 'defaultProfile.jpeg';
  const sql =
    'INSERT INTO `skylight`.`users` (`fullName`, `email`, `userName`, `phone`, `salary`, `position`, `profilePicture`, `password`,`role`,`authMethod`) VALUES (?)';
  const values = [
    fullName,
    email,
    userName,
    phone,
    salary,
    position,
    profilePicture,
    password,
    role,
    authMethod,
  ];

  const sql1 = 'SELECT * FROM skylight.users WHERE email=?';
  const sql2 = 'SELECT * FROM skylight.users WHERE userName=?';
  db.query(sql1, [req.body.email], (err, result) => {
    if (result?.length > 0) {
      return next(new AppError('duplicate email', 500));
    } else {
      db.query(sql2, [req.body.userName], (err, result) => {
        if (result?.length > 0) {
          return next(new AppError('duplicate user name', 500));
        } else {
          db.query(sql, [values], async (err, result) => {
            if (err) {
              return next(
                new AppError(
                  'something went wrong unable to create account',
                  400
                )
              );
            } else {
              return res
                .status(201)
                .json({ result, message: 'Account created successfully' });
            }
          });
        }
      });
    }
  });
});


exports.loginHandler = asyncCatch(async (req, res, next) => {
  const sql = 'SELECT * FROM `skylight`.`users` WHERE userName=?';
  db.query(sql, [req.body.userName], async (err, result) => {
    if (err)
      return next(
        new AppError('something went wrong when fetching employee', 404)
      );
    if (result.length === 0)
      return next(
        new AppError(
          'there is no user found by this user name please register first',
          404
        )
      );

    if (!compareSync(req.body.password, result[0]?.password)) {
      return next(new AppError('Invalid user name or password', 404));
    }

    const payload = {
      userName: result[0]?.userName,
      id: result[0]?.id,
    };

    const token = jwt.sign(payload, 'this is my secret', {
      expiresIn: '90d',
    });

    return res.status(200).json({
      success: true,
      message: 'successfully logged in',
      token: 'Bearer ' + token,
      user: result[0],
    });
  });
});

exports.forgetPassword = asyncCatch(async (req, res, next) => {
  const { email } = req.body;
  const sql1 =
    'UPDATE `skylight`.`users` SET resetTokenExpires=?, resetToken=? WHERE email=?';
  if (!email)
    return next(new AppError('please provide your email address', 404));
  const sql = 'SELECT * FROM skylight.users WHERE email=?';
  db.query(sql, [email], async (err, result) => {
    console.log(err);
    if (result.length === 0)
      return next(new AppError('There is no user registered by this email'));

    const resetTokenGenerator = await crypto.randomBytes(32).toString('hex');
    const resetToken = await crypto
      .createHash('sha256')
      .update(resetTokenGenerator)
      .digest('hex');

    const resetTokenExpires = Date.now() + 30 * 60 * 1000;
    db.query(sql1, [resetTokenExpires, resetToken, email], (err, result) => {
      if (err)
        return next(
          new AppError('something went wrong Unable to update reset data', 500)
        );
      return true;
    });
    
    const passwordResetUrl = `http://localhost:4000/reset?${resetTokenGenerator}`; // this url will sent via email

    try {
      await sendEmail({
        from: 'skylighttechethiopia@gmail.com',
        email: email,
        subject: 'reset your password',
        message: 'verify your email to reset your password',
        html: `<div>this is your verification link click <a style={{background:'#00aeff',color:white,padding:10px;}} href="${passwordResetUrl}">here</a> to reset your password</div>`,
      });
      return res.status(200).json({
        status: 'success',
        message:
          "We have just sent a verification link via your email address please check. it's valid only for 30 minutes",
        passwordResetUrl,
      });
    } catch (err) {
      console.log(err);
      return next(
        new AppError(
          'something went wrong Unable to send the email please try again',
          500
        )
      );
    }

    // return res
    //   .status(200)
    //   .json({ message: 'url is sent check out', url: passwordResetUrl });
  });
});

exports.resetPassword = asyncCatch(async (req, res, next) => {
  const resetToken = await crypto
    .createHash('sha256')
    .update(req.query.resetToken)
    .digest('hex');

  const sql = 'SELECT * FROM `skylight`.`users` WHERE resetToken=?';
  console.log(resetToken);
  db.query(sql, [resetToken], (err, result) => {
    if (result.length === 0 && resetToken !== result[0]?.resetToken) {
      return next(new AppError('Invalid Token', 404));
    } else if (result[0]?.resetTokenExpires * 1 < Date.now() * 1) {
      return next(new AppError('Token Expired', 404));
    } else {
      const sql1 =
        'UPDATE `skylight`.`users` SET `resetTokenExpires`=?, `resetToken`=?, `password`=?, `passwordChangedAt`=? WHERE (`resetToken`=?)';
      db.query(
        sql1,
        ['', '', hashSync(req.body.password, 10) , Date.now(), resetToken],
        (err, result) => {
          console.log(err);
          if (err)
            return next(
              new AppError(
                'something went wrong Unable to update reset data',
                500
              )
            );

          const payload = {
            userName: result[0]?.userName,
            id: result[0]?.id,
          };

          const token = jwt.sign(payload, 'this is my secret', {
            expiresIn: '90d',
          });

          return res.status(201).json({
            status: 'success',
            message: 'Your password changed successfully',
            token: 'Bearer ' + token,
          });
        }
      );
    }
  });
});

exports.readProfileInfo = asyncCatch(async (req, res, next) => {
  res.status(200).json({
    status: 'READ',
    data: req.user,
  });
});

exports.getUsersHandler = asyncCatch(async (req, res, next) => {
  const data = await User.find().sort('-createdAt');
  res.status(200).json({ status: 'success', length: data.length, data });
});

exports.getMyDataHandler = asyncCatch(async (req, res, next) => {
  const data = await User.findOne({ _id: req.query.id });
  const cla = data.class.map(async (c) => Class.findById(c.class));

  const cc = await Promise.all(cla);
  res.status(200).json({ status: 'Read', data, class: cc });
});
