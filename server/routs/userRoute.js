const express = require('express');
const userRouter = express.Router();
const { authorization } = require('../middleware/authorization');
const { authentication } = require('../middleware/authentication');
const { upload } = require('../utils/upload');
const files = upload.fields([{ name: 'profilePicture', maxCount: 1 }]);
const {
  passwordResetValidator,
  signupValidator,
  isValidated,
} = require('../utils/validator');

const {
  signupHandler,
  loginHandler,
  getUsersHandler,
  forgetPassword,
  resetPassword,
  readProfileInfo,
  getMyDataHandler,
} = require('../controller/userController');

const {
  updateEmployee,
  getAllEmployee, 
  deleteEmployee,
  getPermission, 
  updatePermission,
} = require('../controller/employeeController'); 

userRouter
  .route('/signup')
  .post(files, signupValidator, isValidated, signupHandler);

userRouter.route('/login').post(loginHandler);

userRouter.route('/getAllUsers').get(authentication, getUsersHandler);
userRouter
  .route('/getAllEmployee')
  .get(authentication, authorization, getAllEmployee);
userRouter
  .route('/update/data')
  .put(authentication, authorization, updateEmployee); 
userRouter
  .route('/delete/employee')
  .delete(authentication, authorization, deleteEmployee);

userRouter
  .route('/getPermission')
  .get(authentication, authorization, getPermission);
userRouter
  .route('/updatePermission')
  .put(authentication, authorization, updatePermission);

userRouter.route('/readMyData').get(authentication, getMyDataHandler);

userRouter.route('/readProfileInfo').get(authentication, readProfileInfo);

userRouter.route('/forget').post(forgetPassword);

userRouter
  .route('/reset')
  .post(passwordResetValidator, isValidated, resetPassword);

module.exports = userRouter;
