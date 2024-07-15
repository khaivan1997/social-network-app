// initialze server
const express = require('express');
const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`listening to port ${PORT} ...`)
});

// Server socket for communication with clients
const IOSocket = require('socket.io');
const io = IOSocket(server);

io.on('connection', socket => {
    console.log("connected");
});
