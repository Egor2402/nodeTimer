const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    emitTimeUpdate();

    const interval = setInterval(emitTimeUpdate, 1000);

    socket.on('disconnect', () => clearInterval(interval));
});

function emitTimeUpdate() {
    io.emit('time_update', new Date().toLocaleTimeString());
}

http.listen(4001, () => {
  console.log('The server is started (port :4001)');
});