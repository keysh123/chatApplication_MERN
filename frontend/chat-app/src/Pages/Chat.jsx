import React, { useState, useEffect ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { allUsersRoute , host } from '../utils/APIRoutes';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import ConfirmationModal from '../Components/ConfirmationModel';
import {io } from 'socket.io-client'
function Chat() {
  const socket = useRef()
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);
  const [isOpen , setIsOpen] = useState(false)

  useEffect(() => {
    const checkAndFetchUsers = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem('User'));

      if (!storedUser) {
        navigate('/login');
        return;
      }

      setCurrentUser(storedUser);

      try {
        const response = await fetch(`${allUsersRoute}/${storedUser._id}`);
        const data = await response.json();
        setContacts(data.usersData);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching contacts");
      } finally {
        setIsLoading(false);
      }
    };

    checkAndFetchUsers();
  }, [navigate]);
 
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user' , currentUser._id)
    }

  },[currentUser])

  const handleChatChange = (chat) => {
    console.log(chat)
    setCurrentChat(chat);
  };
  const onLogout = async () =>{
    console.log("hello")
    setIsOpen(true)

  }

  if (isLoading) return <div className="text-center mt-10">Loading contacts...</div>;

  return (
    <>
    <div className="flex h-screen">
      <div className="w-1/4 border-r bg-gray-50 p-4 overflow-y-auto">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} onLogout={onLogout} />
      </div>
      <div className="w-3/4 p-4">
        {currentChat ? (
          // <div className="text-xl font-medium">Chat with {currentChat.userName}</div>
          <ChatContainer currentChat = {currentChat}  currentUser ={currentUser} socket = {socket}/>
        ) : (
          // <div className="text-gray-500 text-center mt-40 text-lg">Select a contact to start chatting</div>
          <Welcome user={currentUser}/>
        )}
      </div>
    </div>
    <ConfirmationModal isOpen={isOpen} onClose={()=>{
      setIsOpen(false)
    }} onConfirm={()=>{
      setIsOpen(false)
      sessionStorage.clear()
      localStorage.clear()
      // navigate('/')
      window.location.reload()
    }}
    message={'Are you sure you want to logout'}/>
    </>
  );
}

export default Chat;
