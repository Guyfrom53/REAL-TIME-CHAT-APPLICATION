// public/script.js
const socket = io();
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const messageList = document.getElementById('message-list');

joinBtn.addEventListener('click', () => {
  socket.emit('newUser', usernameInput.value);
  usernameInput.disabled = true;
  joinBtn.disabled = true;
  messageInput.focus();
});

sendBtn.addEventListener('click', () => {
  socket.emit('message', messageInput.value);
  messageInput.value = '';
});

socket.on('newUser', (username) => {
  const li = document.createElement('li');
  li.textContent = `${username} joined the chat`;
  messageList.appendChild(li);
});

socket.on('message', ({ username, message }) => {
  const li = document.createElement('li');
  li.textContent = `${username}: ${message}`;
  messageList.appendChild(li);
});