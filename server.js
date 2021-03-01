const port = '5000';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cluster = require('cluster');
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
if (false) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

} else {
    
    

    server.listen(port, () => {
        console.log('Listening on :', port);
        
        app.get('/',function(req,res){
        res.send('test');
        })
    });
}
