import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contacts({ contacts, currentUser, changeChat, onLogout }) {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const selectContact = (contact, index) => {
    setSelected(index);
    changeChat(contact);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileClick = () => {
    navigate('/set-avatar');
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">

      {/* Search Bar Header */}
      <div className="p-3 bg-white border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50">
        {filteredContacts.map((user, index) => (
          <div
            key={user._id}
            onClick={() => selectContact(user, index)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selected === index ? 'bg-blue-100' : 'hover:bg-gray-200'
            }`}
          >
            <img
              src={user.avatarImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.userName}`}
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
            <span className="text-base font-medium text-gray-800">{user.userName}</span>
          </div>
        ))}
      </div>

      {/* Current User Profile */}
      {currentUser && (
        <div className="flex items-center justify-between p-3 border-t bg-white">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleProfileClick}
              className="relative focus:outline-none"
            >
              <img
                src={
                  currentUser.avatarImage ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.userName}&backgroundColor=b6e3f4`
                }
                alt="Your Avatar"
                className="w-12 h-12 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                  Change
                </span>
              </div>
            </button>
            <div>
              <p className="text-sm font-medium text-gray-800">{currentUser.userName}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}