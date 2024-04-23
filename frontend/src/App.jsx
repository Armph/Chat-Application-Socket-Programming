import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import Register from "./pages/Register";
import socketIOClient from 'socket.io-client';
import { useEffect } from "react";
import io from 'socket.io-client';
import { Button } from "@mui/material";

const ENDPOINT = 'http://192.168.1.6:5000';
const socket = io(ENDPOINT);

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messenger />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Button onClick={() => socket.emit('test', 'Hello from React!')}>Test</Button>
    </BrowserRouter>
  );
}
