import React, { useEffect, useRef } from 'react';

export default function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[75%] px-4 py-2 rounded-lg break-words
            ${msg.fromSelf
              ? 'self-end bg-blue-500 text-white rounded-br-none'
              : 'self-start bg-gray-200 text-gray-800 rounded-bl-none'}`}
        >
          {msg.message}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
