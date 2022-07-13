const User = require("./../model/User");

const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

let addUser = (userId, socketId) => {
  let user = users.some((u) => u.userId === userId);

  if (!user) {
    users.push({
      socketId: socketId,
      userId: userId,
    });
  }
};

// get Notifications

// Get user
let getUser = (resiverId) => {
  return users.find((user) => user.userId === resiverId);
};

// Remove user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("someone joined");
  // Join User
  socket.on("join", async ({ userId }) => {
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  // send Notifications
  socket.on("sentNotification", ({ senderInfo, resiverInfo }) => {
    let user = getUser(resiverInfo.userId);

    if (user) {
      io.to(user.socketId).emit("getNotification", senderInfo);
    }
  });

  socket.on("disconnect", () => {
    console.log("Someone left");
    removeUser(socket.id);
  });
});
