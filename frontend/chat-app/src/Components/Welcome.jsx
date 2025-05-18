import React from 'react';
import Robot from '../assets/robot.gif'; // Make sure the path is correct

export default function Welcome({ user }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-3">
      <img
        src={Robot}
        alt="hello robot"
        className="mb-4"
        style={{ width: '200px', maxWidth: '100%' }}
      />
      <h2 className="mb-2">Welcome, {user.userName}!</h2>
      <p className="text-muted">Select a contact to start chatting.</p>
    </div>
  );
}
