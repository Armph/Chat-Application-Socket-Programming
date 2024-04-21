const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const connectedUsers = {};

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'test.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('user connected', (user) => {
        connectedUsers[socket.id] = user;
        io.emit('user connected', connectedUsers);
    });
    socket.on('disconnect', () => {
        delete connectedUsers[socket.id];
        io.emit('user disconnected', connectedUsers);
    });
    socket.on('set-name', (name) => {
        connectedUsers[socket.id] = name;
        io.emit('user connected', connectedUsers);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
