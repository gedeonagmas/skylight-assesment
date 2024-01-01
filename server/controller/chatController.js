const { groupModel } = require('./../models/groupModel');
const { chats } = require('./../models/chatsModel');
const { Signup } = require('../models/signupModel');
const asyncCatch = require('express-async-catch');

exports.getUsers = asyncCatch(async (req, res, next) => {
  const user = await Signup.find().select('-password');
  res.status(200).send(user);
});

exports.groupCreateHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.create({
    groupName: req.body.groupName,
    flag: req.body.flag,
    ownersName: req.body.ownersName,
    ownersId: req.body.ownersId,
    members: req.body.members,
    requests: [],
    groupPro: req.files.groupPro ? req.files.groupPro[0].filename : undefined,
  });
  res.status(200).send(data);
});

exports.groupGetHandler = asyncCatch(async (req, res) => {
  const data = await await groupModel.find();
  res.status(200).send(data);
});

exports.singleGroupGetHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.find({ _id: req.query.ids });
  res.status(200).send(data);
});

exports.getOwnGroupHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.find({ ownersId: req.query.ids });
  res.status(200).send(data);
});

exports.addGroupMemberHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.updateOne(
    { _id: req.query.ids },
    {
      $set: {
        members: req.body.members,
      },
    }
  );
  res.status(200).send(data);
});

exports.joinRequestHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.updateOne(
    { _id: req.query.ids },
    {
      $set: {
        requests: req.body.requests,
      },
    }
  );
  res.status(200).send(data);
});

exports.deleteGroupHandler = asyncCatch(async (req, res) => {
  const data = await groupModel.deleteOne({ _id: req.query.ids });
  res.status(201).send(data);
});

exports.chatsHandler = asyncCatch(async (req, res) => {
  const data = await chats.create({
    chatOwners: req.body.chatOwners,
    chatId: req.body.chatId,
    messages: req.body.messages,
    chatType: req.body.chatType,
  });
  res.status(201).send(data);
});

exports.getPrivateChatHandler = asyncCatch(async (req, res) => {
  const data = await chats.find({ chatId: req.query.ids });
  res.status(201).send(data);
});

exports.getPrivateChatHandlerSpecial = asyncCatch(async (req, res) => {
  const data = await chats.find({ chatId: req.body.ids });
  res.status(201).send(data);
});

exports.updatePrivateChatHandler = asyncCatch(async (req, res) => {
  const data = await chats.updateOne(
    { chatId: req.query.ids },
    {
      $set: {
        chatOwners: req.body.chatOwners,
        chatId: req.body.chatId,
        messages: req.body.messages,
        chatType: req.body.chatType,
      },
    }
  );
  res.status(200).send(data);
});

exports.getSingleUser = asyncCatch(async (req, res) => {
  const data = await Signup.find({ _id: req.query.ids });
  res.status(200).send(data);
});

const fileHandler = (val) => {
  return val.toFixed(2);
};

exports.fileSendHandler = asyncCatch(async (req, res) => {
  const data = await chats.findOne({
    chatId: req.body.chatId,
  });
  data.messages = [
    ...data.messages,
    {
      messageType: req.body.messageType,
      fileDescription: req.body.fileDescription,
      time: req.body.time,
      sender: req.body.sender,
      image: req.body.image,
      path: req.files.fileUpload[0].filename,
      size: fileHandler(req.files.fileUpload[0].size / 1024 / 1024),
      originalName: req.files.fileUpload[0].filename,
      mimeType: req.files.fileUpload[0].mimetype,
    },
  ];
  await data.save();
  res.status(200).send(data);
});

