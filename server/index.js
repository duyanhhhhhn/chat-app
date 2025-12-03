const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
const {Server} = require("socket.io")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

app.get("/", (req, res) => { 
    res.send("Welcome our chat app APIS ")
})

const port = process.env.port || 3000;
const uri = process.env.ATLAS_URI 
const expressServer =  app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port} `)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established")).catch((err) => console.log("MongoDB connection failed : ", err.message))

const io = new Server(expressServer, { cors: "http://localhost:5173" });
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


