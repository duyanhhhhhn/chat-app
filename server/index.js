const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
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
app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port} `)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established")).catch((err) => console.log("MongoDB connection failed : ",err.message))