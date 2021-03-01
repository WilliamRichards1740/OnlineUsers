const port = '5000';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let onlineUsers = [];

io.on('connection', (socket) => {
    onlineUsers.push(socket);

    
    var ids = [];
    for (var s of onlineUsers) { ids.push(s.id); }
    io.emit('users', { online: onlineUsers.length, ids: ids });

console.log('online users: ' + onlineUsers.length)


    socket.on("disconnect", () => {
        onlineUsers.splice(onlineUsers.indexOf(socket), 1);
    });
});