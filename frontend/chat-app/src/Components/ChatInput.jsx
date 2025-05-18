import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { FaSmile, FaPaperPlane } from 'react-icons/fa';

export default function ChatInput({ handleSendMessage }) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setMsg((prev) => prev + emojiData.emoji);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      handleSendMessage(msg);
      setMsg('');
    }
  };

  return (
    <div className="relative p-4 bg-white shadow-sm">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <Picker onEmojiClick={handleEmojiClick} height={350} />
        </div>
      )}

      {/* Input Row */}
      <form
        onSubmit={sendChat}
        className="flex items-center gap-3"
      >
        {/* Emoji Toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-gray-500 hover:text-blue-600"
        >
          <FaSmile size={22} />
        </button>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
