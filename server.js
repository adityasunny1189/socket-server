const io = require("socket.io")(process.env.PORT, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("connected");
  
    socket.on("get-codeId", (codeId,user_name) => {
      socket.join(codeId);
      socket.on("disconnect", () => {
        console.log(`disconnected:-${codeId}`);
      });
  
      socket.broadcast.to(codeId).emit("recieve-name", user_name);
  
      socket.on("send-changes", (code, language) => {
        socket.broadcast.to(codeId).emit("recieve-changes", code, language);
      });
    });
  });