

const socket = io('http://localhost:8000');

const form =document.getElementById('send-cont');
const messageInput =document.getElementById('messageimput');
const  messagecontainer =document.getElementById("ggd");
const names = prompt("enter your name");

if(names==null || names==""){
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newmessage=messageInput.value;
    Appends(newmessage,'send',names);

    socket.emit('send',newmessage);
    messageInput.value="";


});

const Appends=(message ,possition,name)=>{
    var txt3 = document.createElement('div');
txt3.setAttribute("class","message "+possition)
    var h6e = document.createElement('h6');
    h6e.innerHTML=name;
    var ptag=document.createElement('p');
    ptag.innerHTML=message
    txt3.append(h6e);
    txt3.append(ptag);
    messagecontainer.append(txt3);
    
    
}

Appends("You joined chat",'send',"you");


socket.emit('new-user-joined', names);




socket.on('user-joined',name=>{
    Appends(name+' joined the chat','received',name);

})
socket.on('receive',data=>{
    Appends(data.message,'received',data.name);

})
}else{
    const names = prompt("enter your name");
}