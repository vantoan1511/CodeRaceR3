const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const {
    Server
} =  require('socket.io')

const io = new Server(server)
app.get('/', (req,res)=>{
   res.sendFile(__dirname+'/test.htm')
})

io.on('connection', (socket)=>{
    console.log('user connected');
})
server.listen(3000,()=>{
    console.log('listen');
})
