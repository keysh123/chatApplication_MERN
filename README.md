💬 Full-Stack Chat App (Socket.IO + MongoDB)
A full-stack real-time chat application built using React.js, Node.js, Socket.IO, and MongoDB. This app supports user authentication, avatar setup, and live messaging between all connected users in a single global chat.

🔗 Live Demo: https://chatappm.netlify.app/

✨ Features
🔐 User Registration & Login with password hashing

🖼️ Set Avatar after registering to personalize your profile

⚡ Real-time messaging using Socket.IO

💾 Messages and user data stored in MongoDB

🧑‍🤝‍🧑 All users chat in one shared global chat space

🖥️ Basic static UI (non-responsive for now)

🛠️ Tech Stack
Frontend: React.js, CSS

Backend: Node.js, Express

WebSocket: Socket.IO

Database: MongoDB (via Mongoose)

Authentication: JWT (if applicable) or session-based

Deployment: Netlify (frontend), render (backend)

⚙️ How It Works
User registers → sets an avatar → logs in

Messages are sent/received in real-time using Socket.IO

All messages and user data are stored in MongoDB

No chatrooms — single global conversation stream
