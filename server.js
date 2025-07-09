// server.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

let users = {};
let messages = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a new client connected');

  socket.on('newUser', (username) => {
    users[socket.id] = username;
    io.emit('newUser', username);
  });

  socket.on('message', (message) => {
    messages.push({ username: users[socket.id], message });
    io.emit('message', { username: users[socket.id], message });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log('a client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});