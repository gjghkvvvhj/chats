

const socket = io();

const form =document.getElementById('send-cont');
const messageInput =document.getElementById('messageimput');
const  messagecontainer =document.getElementById("ggd");


    const names = prompt("enter your name");
    


 
 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newmessage=messageInput.value;
    Appends(newmessage,'send',names);

    socket.emit('send',newmessage);
    messageInput.value="";


});

const Appends=(message ,possition,name)=>{
    if(name == ""){
        name="i am froud";
    }
    if(name == null){
        name="i am froud";
    } 
    if(name == "admin88"){
        name="";
    }
   
    
    var txt3 = document.createElement('div');
txt3.setAttribute("class","message "+possition)
    if(possition=="center"){
  
    }else{
          var h6e = document.createElement('h6');
    h6e.innerHTML=name;
         txt3.append(h6e);
    }
    var ptag=document.createElement('p');
    ptag.innerHTML=message
   
    txt3.append(ptag);
     var time = document.createElement('p');
time.setAttribute("class","time");
    txt3.append(time);
    messagecontainer.append(txt3);
        
    
    
}

Appends("You joined chat",'center',"you");


socket.emit('new-user-joined', names);




socket.on('user-joined',name=>{
    Appends(name+' joined the chat','center',name);

})
socket.on('receive',data=>{
    Appends(data.message,'received',data.name);

})


