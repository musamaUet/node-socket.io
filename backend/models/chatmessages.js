'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatMessages = sequelize.define('ChatMessages', {
    author: DataTypes.STRING,
    message: DataTypes.TEXT,
    chatRoomId: DataTypes.INTEGER
  }, {});
  ChatMessages.associate = function(models) {
    // associations can be defined here
  };
  return ChatMessages;
};