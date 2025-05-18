const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoute");

const app = express();
require("dotenv").config();

// CORS configuration
const allowedOrigins = [
  "https://chatappm.netlify.app",  // Your actual Netlify URL
  "http://localhost:3000",  // Allow localhost for development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("error", err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});

// Socket.IO CORS configuration
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chatappm.netlify.app"],  // Correct Netlify URL
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
