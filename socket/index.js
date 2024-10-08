const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    // Listen to addNewUser event
    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some(user => user.userId === userId)) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
        }
        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers); // Fixed event name
    });

    // Add Message event
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId);
        if (user) {
            io.to(user.socketId).emit("getMessage", message); // Include the message
            io.to(user.socketId).emit("getNotification", {
            senderId: message.senderId,
            isRead: false,
            date: new Date(),
        });
        }
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers); // Fixed event name
    });
});

io.listen(4000);
