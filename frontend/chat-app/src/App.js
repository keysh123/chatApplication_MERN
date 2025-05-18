import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import { ToastContainer } from "react-toastify";
import SetAvatar from "./Pages/SetAvatar";

export default function App() {
 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/" element={ <Chat /> } />
          <Route path="/set-avatar" element={ <SetAvatar /> } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
