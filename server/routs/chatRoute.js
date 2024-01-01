const express = require('express');
const chatRoute = express.Router();
const { upload } = require('../utils/upload');

const {
  chatsHandler,
  getPrivateChatHandler,
  updatePrivateChatHandler,
  groupCreateHandler,
  groupGetHandler,
  singleGroupGetHandler,
  getOwnGroupHandler,
  addGroupMemberHandler,
  joinRequestHandler,
  getSingleUser,
  fileSendHandler,
  getPrivateChatHandlerSpecial,
  getUsers,
} = require('./../controller/chatController');

const {
  signupHandler,
  getSingleUserData,
  deleteMongoUser,
} = require('../controller/mongoController');

const profilePic = upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'groupPro', maxCount: 1 },
  { name: 'fileUpload', maxCount: 1 },
]);

chatRoute.route('/get/all/users').get(getUsers);
chatRoute.route('/create/private/chat').post(chatsHandler);
chatRoute.route('/get/private/chat').get(getPrivateChatHandler);
chatRoute.route('/get/private/chat/special').post(getPrivateChatHandlerSpecial);
chatRoute.route('/update/private/chat').patch(updatePrivateChatHandler);
chatRoute.route('/send/file').post(profilePic, fileSendHandler);
chatRoute.route('/post/group').post(profilePic, groupCreateHandler);
chatRoute.route('/get/group/data').get(groupGetHandler);
chatRoute.route('/get/single/group').get(singleGroupGetHandler);
chatRoute.route('/get/own/group').get(getOwnGroupHandler);
chatRoute.route('/get/single/user').get(getSingleUser);
chatRoute.route('/add/group/member').patch(addGroupMemberHandler);
chatRoute.route('/join/request').patch(joinRequestHandler);
chatRoute.route('/add/data').post(profilePic, signupHandler);
chatRoute.route('/get/single/users').get(getSingleUserData);
chatRoute.route('/delete/mongo/users').delete(deleteMongoUser);

module.exports = chatRoute;
