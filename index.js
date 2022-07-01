//send and get message
socket.on("sendNotification", async ({ resiverId, text }) => {
  let user = await getUser(resiverId);

  io.to(user.socketId).emit("getMessage", text);
});
