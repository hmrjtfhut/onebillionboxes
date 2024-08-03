const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Checkbox = require('./models/checkbox');
const Team = require('./models/team');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost/checkboxes', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('checkbox-update', async (data) => {
    await Checkbox.findOneAndUpdate({ id: data.id }, { checked: data.checked }, { upsert: true });
    io.emit('checkbox-update', data);
  });

  socket.on('join-team', async (data) => {
    await Team.findOneAndUpdate({ name: data.name }, { color: data.color }, { upsert: true });
    socket.join(data.name);
    io.to(data.name).emit('team-update', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
