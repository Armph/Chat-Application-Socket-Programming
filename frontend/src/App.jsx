import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import Register from "./pages/Register";
import socketIOClient from 'socket.io-client';
import { useEffect } from "react";
import io from 'socket.io-client';
import { Button } from "@mui/material";
import { useState } from "react";

const ENDPOINT = 'http://192.168.1.6:5000';
const socket = io(ENDPOINT);

export default function App() {
  const [users, setUsers] = useState({});
  const [myName, setMyName] = useState('Anonymous');
  const [chatMsg, setChatMsg] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedDestName, setSelectedDestName] = useState(null);

  function setName(name) {
    setMyName(name);
    socket.emit('set-name', name);
  }

  function setSelectedChatRoom(socketId) {
    setSelectedChat(socketId);
    setSelectedDestName(users[socketId]);
  }

  function sendPrivateMessage(msg) {
    const payload = {
      to: selectedChat,
      msg: msg
    };
    socket.emit('private message', payload);
  }

  useEffect(() => {
    socket.on('user connected', (usersObj) => {
      setUsers(usersObj);
    });
    socket.on('user disconnected', (usersObj) => {
      setUsers(usersObj);
    });
    socket.on('private message', (msg) => {
      setChatMsg(msg);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger setName={setName} users={users} myName={myName} selectedChat={selectedChat} setSelectedChatRoom={setSelectedChatRoom} selectedDestName={selectedDestName} socket={socket.id} sendPrivateMessage={sendPrivateMessage} chatMsg={chatMsg} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
