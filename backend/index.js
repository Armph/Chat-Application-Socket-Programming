const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.use(cors());

const clients = {};
const groups = [];
const messages = {};
/*
messages Schema {
    socketId: {
        socketId: {
            from: socketId,
            msg: message
        }
    }
}
*/


io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    clients[socket.id] = 'Anonymous';
    io.emit('user connected', Object(clients));

    socket.on('disconnect', () => {
        delete clients[socket.id];
        io.emit('user disconnected', Object(clients));
        //io.emit('user disconnected', socket.id);
    });
    socket.on('set-name', (name) => {
        clients[socket.id] = name;
        console.log(clients)
        io.emit('user connected', Object(clients));
    });
    socket.on('private message', (payload) => {
        if (messages[payload.to] === undefined) {
            messages[payload.to] = {};
        }
        if (messages[payload.to][socket.id] === undefined) {
            messages[payload.to][socket.id] = [];
        }
        messages[payload.to][socket.id].push({from: socket.id, msg: payload.msg});
        if (messages[socket.id] === undefined) {
            messages[socket.id] = {};
        }
        if (messages[socket.id][payload.to] === undefined) {
            messages[socket.id][payload.to] = [];
        }
        if (socket.id !== payload.to) {
            messages[socket.id][payload.to].push({from: socket.id, msg: payload.msg});
        }
        console.log("messages:", messages[payload.to]);
        io.to(payload.to).emit('private message', messages[payload.to]);
        io.to(socket.id).emit('private message', messages[socket.id]);
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

    socket.on('test', (msg) => {
        console.log(msg);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
