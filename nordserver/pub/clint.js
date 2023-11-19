

const socket = io();

const form =document.getElementById('send-cont');
const messageInput =document.getElementById('messageimput');
const  messagecontainer =document.getElementById("ggd");


    const names = prompt("enter your name");
    


 
 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newmessage=messageInput.value;
    const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
    Appends(newmessage,'send',names,time);

    socket.emit('send',newmessage);
    messageInput.value="";


});
const  deletcall(ids){
  
    socket.emit('deletsend',ids);


}
const Appends=(message ,possition,name,stime)=>{
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
txt3.setAttribute("class","message "+possition);
    txt3.setAttribute("id",stime+name);
     txt3.setAttribute("ondblclick","deletcall(this.id)");
    if(possition=="center"){
  
    }else{
          var h6e = document.createElement('h6');
    h6e.innerHTML=name;
         txt3.append(h6e);
    }
    var ptag=document.createElement('p');
    ptag.innerHTML=message;
   
    txt3.append(ptag);
     var time = document.createElement('p');
time.setAttribute("class","time");
      time.innerHTML=stime;
    txt3.append(time);
    messagecontainer.append(txt3);
        
    
    
}
 const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric' });
Appends("You joined chat",'center',"you",time);


socket.emit('new-user-joined', names,time);




socket.on('user-joined',name,time=>{
    Appends(name+' joined the chat','center',name,time);

})
socket.on('receive',data=>{
    Appends(data.message,'received',data.name,data.time);

})
socket.on('deletreceive',datas=>{
    
    const element = document.getElementById(datas.ids);
element.remove();
   

})

