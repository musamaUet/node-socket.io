'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoomMessages = sequelize.define('ChatRoomMessages', {
    author: DataTypes.STRING,
    message: DataTypes.TEXT,
    chatRoomId: DataTypes.INTEGER
  }, {});
  ChatRoomMessages.associate = function(models) {
    // associations can be defined here
  };
  return ChatRoomMessages;
};