
const net = require('net');
const port = 7070;
const host = '172.21.160.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

const io = require(host)(8000);
const users={};
io.on('connection',socket=>{
    console.log("gggg");
   socket.on('new-user-joined',name =>{
    console.log("new user:",name);
users[socket.id]=name;
socket.broadcast.emit('user-joined',name);
   });

   socket.on('send',message =>{
    socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
   });
})