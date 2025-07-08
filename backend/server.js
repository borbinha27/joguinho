const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { randomUUID } = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const players = {};
const speed = 3;

app.use(express.static('../frontend'));

io.on('connection', (socket) => {
  const id = socket.id;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  players[id] = { x: 400, y: 300, color };

  socket.emit('init', id);

  socket.on('move', (keys) => {
    const p = players[id];
    if (!p) return;

    if (keys['w']) p.y -= speed;
    if (keys['s']) p.y += speed;
    if (keys['a']) p.x -= speed;
    if (keys['d']) p.x += speed;

    for (const otherId in players) {
      if (otherId !== id) {
        const o = players[otherId];
        const dx = o.x - p.x;
        const dy = o.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 40) {
          p.color = '#fff';
          o.color = '#fff';
        }
      }
    }
  });

  socket.on('disconnect', () => {
    delete players[id];
  });
});

setInterval(() => {
  io.sockets.emit('state', players);
}, 1000 / 60);

server.listen(3000, () => {
  console.log('Server on port 3000');
});
