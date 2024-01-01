const { Signup } = require('../models/signupModel');

exports.signupHandler = async (req, res, next) => {
  const profilePicture = req.files.profilePicture
    ? req.files.profilePicture[0].filename
    : 'defaultProfile.jpg';
  const { fullName,userName,email,position,salary,phone,password,role} = req.body;
 await Signup.create({
    fullName,
    userName,
    email,
    position,
    salary,
    phone,
    password,
    profilePicture,
    role
  });
};

exports.getSingleUserData = async (req,res,next) => {
  const data = await Signup.findOne({ userName: req.query.userName });
  res.status(200).json(data);
}

exports.deleteMongoUser = async (req, res, next) => {
  const data = await Signup.deleteOne({ userName: req.query.userName });
  res.status(200).json(data);
};