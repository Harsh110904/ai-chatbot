require('dotenv').config({ path: './src/.env' });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const generateResponse = require('./src/service/ai.service.js');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('ai-message', async (data) => {
    console.log("AI message received:", data)
    const response = await generateResponse(data)
    console.log("AI response:", response)
    socket.emit("ai-message-response", response)
  });
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { io };