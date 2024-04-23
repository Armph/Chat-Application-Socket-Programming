const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const clients = {};
const groups = [];

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'test.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    clients[socket.id] = 'Anonymous';
    io.emit('user connected', Object(clients));

    socket.on('disconnect', () => {
        delete clients[socket.id];
        io.emit('user disconnected', socket.id);
    });
    socket.on('set-name', (name) => {
        clients[socket.id] = name;
        io.emit('user connected', Object(clients));
    });
    socket.on('private message', (msg) => {
        if (msg.msg == 'debug') {
            console.log('clients:', clients);
            console.log('groups:', groups);
        }
        if (msg.to == socket.id) {
            io.to(socket.id).emit('private message', 'You: ' + msg.msg);
        } else {
            io.to(msg.to).emit('private message', clients[socket.id] + ': ' + msg.msg);
            io.to(socket.id).emit('private message', 'You: ' + msg.msg);
        }
    });
    socket.on('chat message', (msg) => {
        if (msg == 'debug') {
            console.log('clients:', clients);
            console.log('groups:', groups);
        }
        io.emit('chat message', clients[socket.id] + ': ' + msg);
    });
    socket.on('create group', (msg) => {
        socket.join(msg.name);
        groups.append(msg.name);
        io.broadcast.emit('group list', groups);
    })

    socket.on('join group', (msg) => {
        socket.join(msg.name);
    })


});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
