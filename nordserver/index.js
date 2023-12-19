const  express = require('express')
const app = express()
const port = 8000
const IP = require('ip');
const http =require('http').createServer(app)
app.use(express.static(__dirname+'/pub'))

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))
app.get('/data/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})
http.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io = require('socket.io')(http);
const users={};
io.on('connection',socket=>{
    console.log("gggg");
   socket.on('new-user-joined',njdata =>{
    console.log("new user:",njdata.name);
users[socket.id]=njdata.name;
socket.broadcast.emit('user-joined',{name:njdata.name,time:njdata.time});
   });
 socket.on('deletsend',ids =>{
       if(users[socket.id]=="admin88"){
    socket.broadcast.emit('deletreceive',{ids: ids})
       }
   });
   socket.on('send',message =>{
       const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
    socket.broadcast.emit('receive',{message: message, name: users[socket.id],time:time})
   });
})
