// npm init -y
// npm install socket.io

// npm install express --save
// npm install ejs
// npm install --save-dev nodemon

// node .

const express = require('express');
const app = express();

const http = require('http').createServer(app); // express
const io = require('socket.io')(http, { cors: { origin: "*" } });

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render('index');    
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );

io.on('connection', (socket) => {
    console.log(`User with id: ${socket.id.substr(0,3)} is connected`);

    socket.on('message', (data) => {
        console.log(`${socket.id.substr(0,3)}: ${data}`);
        // socket.broadcast.emit('message', data); // send to others        
        io.emit('message', `${socket.id.substr(0,3)}: ${data}`); // send to all
    });
});