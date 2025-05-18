// import React, { useEffect, useState  , useRef} from "react";
// import ChatInput from "./ChatInput";
// import { addMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";
// import { toast } from "react-toastify";
// import Messages from "./Messages";
// import {v4 as uuidv4} from "uuid"

// export default function ChatContainer({ currentChat, currentUser, socket }) {
//   const [messages, setMessages] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Load all messages when currentChat changes
//     async function loadMessages() {
//       const response = await fetch(getAllMessagesRoute, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ from: currentUser._id, to: currentChat._id }),
//       });
//       const data = await response.json();
//       setMessages(data.messages || []);
//     }
//     if (currentChat?._id) loadMessages();
//   }, [currentChat, currentUser]);

//   const handleSendMessage = async (message) => {
//     // Send message to backend API
//     const response = await fetch(addMessageRoute, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ from: currentUser._id, to: currentChat._id, message }),
//     });
//     const data = await response.json();

//     if (data.status === false) {
//       toast.error(data.message || "Failed to send message");
//     } else if (data.status === true) {
//       toast.success(data.message);
//     }

//     // Emit message through socket to recipient
//     socket.current.emit("send-msg", {
//       to: currentChat._id,
//       from: currentUser._id,
//       message,
//     });

//     // Optimistically update UI
//     setMessages((prev) => [...prev, { fromSelf: true, message }]);
//   };

//   // Listen for incoming messages via socket
//   useEffect(() => {
//     if (!socket.current) return;

//     const handleMessageReceive = (msg) => {
//       setArrivalMessage({ fromSelf: false, message: msg });
//     };

//     socket.current.on("msg-receive", handleMessageReceive);

//     return () => {
//       socket.current.off("msg-receive", handleMessageReceive);
//     };
//   }, [socket]);

//   // Add newly arrived message to messages state
//   useEffect(() => {
//     console.log(arrivalMessage)
//     if (arrivalMessage) {
//       setMessages((prev) => [...prev, arrivalMessage]);
//     }
//   }, [arrivalMessage]);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full border-l">
//       {/* Chat Header */}
//       <div className="flex items-center gap-4 p-4 border-b bg-gray-100">
//         <img
//           src={
//             currentChat?.avatarImage ||
//             `https://api.dicebear.com/7.x/initials/svg?seed=${currentChat.userName}&backgroundColor=b6e3f4`
//           }
//           alt="avatar"
//           className="w-12 h-12 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
//         />
//         <h5 className="text-lg font-semibold text-gray-800">
//           {currentChat?.userName || "Chat User"}
//         </h5>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 p-4 overflow-auto bg-gray-50">
//         <Messages messages={messages} />
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t bg-white">
//         <ChatInput handleSendMessage={handleSendMessage} />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import { addMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import Messages from "./Messages";
import {v4 as uuidv4} from "uuid"
export default function ChatContainer({ currentChat, currentUser ,socket}) {
  const [messages, setMessages] = useState([]);
  const [ arrivalMessage,setArrivalMessage] = useState(null)
  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetch(getAllMessagesRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: currentUser._id,
          to: currentChat._id,
        }),
      });

      const data = await response.json();
      // console.log(data);

      setMessages(data.messages);
    };
    loadMessages();
  }, [currentChat]);
  const handleSendMessage = async (message) => {
    const response = await fetch(addMessageRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: currentUser._id,
        to: currentChat._id,
        message: message,
      }),
    });

    const data = await response.json();
    // console.log(data);

    if (data.status === false) {
      toast.error(data.message || "Registration failed");
    } else if (data.status === true) {
      toast.success(data.message);
    }

    socket.current.emit('send-msg' ,{
      to : currentChat._id,
      from : currentUser._id,
      message : message
    })
    const msg = [...messages]
    msg.push({fromSelf : true , message : message})
    setMessages(msg)
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on('msg-receive',(msg)=>{
       setArrivalMessage({
        fromSelf : false,
        message : msg
       })
      })
    }

  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>
      [...prev,arrivalMessage]
    )

  },[arrivalMessage])
  return (
    <div className="flex flex-col h-full border-l">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-gray-100">
        <img
          src={
            currentChat?.avatarImage ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${currentChat.userName}&backgroundColor=b6e3f4`
          }
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
        />
        <h5 className="text-lg font-semibold text-gray-800">
          {currentChat?.userName || "Chat User"}
        </h5>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        <Messages messages = {messages}/>
        {/* ChatMessages component will go here */}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t bg-white">
        {/* ChatInput component will go here */}
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
