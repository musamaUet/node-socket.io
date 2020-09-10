const express = require("express");
const models = require("../models");
const router = express.Router();
const redis = require('redis');
const cache=require('../middlewares/index')

// Call some middlewares here to implement redis

/* GET users listing. */
router.get("/chatrooms", async (req, res, next) => {
  // write some code here to check cache either data is already placed here or move in else in calse of not
  const chatRooms = await models.ChatRoom.findAll();
  res.send(chatRooms);
});

router.post("/chatroom", cache, async (req, res, next) => {
  // also write some code here to save data in redis/cache
  const room = req.body.room;
  const chatRooms = await models.ChatRoom.findAll({
    where: { name: room },
  });
  const chatRoom = chatRooms[0];
  // here try to store chatRoom in redis and this will be valid for 1 hour
  redis.setex(chatRoom,3600);
  if (!chatRoom) {
    await models.ChatRoom.create({ name: room });
  }
  res.send(chatRooms);
});

router.get("/chatroom/messages/:chatRoomName", async (req, res, next) => {
  try {
    // first fetch cache/redis and then run this piece of code

    const chatRoomName = req.params.chatRoomName;
    const chatRooms = await models.ChatRoom.findAll({
      where: {
        name: chatRoomName,
      },
    });
    const chatRoomId = chatRooms[0].id;
    const messages = await models.ChatMessage.findAll({
      where: {
        chatRoomId,
      },
    });
  // here again store chatRoom and chatRoomId in redis
  redis.setex(chatRoomId,messages)
    res.send(messages);
  } catch (error) {
    res.send([]);
  }
});

module.exports = router;
