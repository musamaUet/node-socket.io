//Cache midleware
export function cache(req, res, next) {
    const chatRoom = req.params.room;
    redisClient.get(chatRoom, (error, cachedData) => {
      if (error) throw error;
      if (cachedData != null) {
        res.send(setResponse(username, cachedData));
      } else {
        next();
      }
    });
  }