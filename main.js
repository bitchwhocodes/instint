var http = require('http'),
  fs = require('fs'),
  // okay sync just cos its booting this bad stuff up
  index = fs.readFileSync(__dirname + '/index.html');

// K i am sending back a basic file here yo
var app = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
});
app.listen(process.env.port);
// Socket.io server listens to our app
var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
  socket.emit('welcome', { message: 'Welcome!', id: socket.id });
});

// Send current time to all connected clients
function sendMessage() {
  io.emit('message', { msg: new Date().toJSON() });
}

// Send current time every 10 secs// STACEY TEST THIS 
setInterval(sendMessage, 1000);