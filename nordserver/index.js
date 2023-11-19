const  express = require('express')
const app = express()
const port = 8000
const http =require('http').createServer(app)
app.use(express.static(__dirname+'/pub'))

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))
http.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io = require('socket.io')(http);
const users={};
io.on('connection',socket=>{
    console.log("gggg");
   socket.on('new-user-joined',name =>{
    console.log("new user:",name);
users[socket.id]=name;
socket.broadcast.emit('user-joined',name);
   });

   socket.on('send',message =>{
       const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
    socket.broadcast.emit('receive',{message: message, name: users[socket.id]},time)
   });
})
