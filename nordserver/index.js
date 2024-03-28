const  express = require('express')
const app = express()
const port = 8000
const http =require('http').createServer(app)
app.use(express.static(__dirname))

// app.get('/', (req, res) => res.sendFile(__dirname+'/socket.js'))
http.listen(port, () => console.log(`Example app listening on port ${port}!`))



var mysql = require('mysql');

var connection = mysql.createPool({
    host: '89.117.27.1',
    user: 'u626595585_chatsubbot',
    password: '3]vcC@gR',
    database:'u626595585_chatsubbot',
    port:3306,

   
  });
  var getConnection = function() {
    connection.getConnection(function(err, connection) {
        
    });
};


  
    
 

 

const io = require('socket.io')(http);

// io.use((socket,next)=>{
//   console.log(socket);
// })

const users={};
io.on('connection',socket=>{



   socket.on('sendvss',message =>{
   const time = new Date()
var senddtaaquery2 = `SELECT * FROM humman_msg_any where chatbot_id="`+message.bot_id+`" AND chat_id="`+message.chat_id+`" AND status="2" AND agent="`+message.agent_id+`"`;
  connection.query(senddtaaquery2, function(error, datas){
	  console.log(datas+"  $  "+datas.length)
     if(datas.length>=1){
  if( datas[0].agent==message.agent_id){
	  var inserquarry=`INSERT INTO humman_msg_any (id, chatbot_id, msg, chat_id, agent,msg_type, time, status, browser_agent) VALUES (NULL, '`+message.bot_id+`', '`+message.msg+`', '`+message.chat_id+`', '`+message.agent_id+`','1', '`+time+`', '2', '0');`
    connection.query(inserquarry)  
  socket.broadcast.emit(message.chat_id,{chat_id:message.chat_id,bot_id:message.bot_id,msg:message.msg,type:'user',msg_type:'msg'})
}
  }else{
	  
  }


  });
   });


   function sendxx(name,datass){
    console.log(name+datass)
    socket.broadcast.emit(name,"datass");
    socket.broadcast.emit("connectsucce","hello hoew are you");

   }
   

socket.on('coon_tel',(data) =>{
  getConnection();
  console.log(data.email)
     var query1 = `SELECT * FROM agent where bot_id="`+data.bot_id+`" AND email="`+data.email+`" AND password="`+data.password+`"`;
     connection.query(query1, function(error, datas){
    
   


    var query1=datas;
    console.log(query1.length);
   var msg="Something Error Talk @Reward_Tree"
   
    if(query1.length==1){
     var name=query1[0].name;
     var telar=query1[0].tel_id;
     if(telar==""){
     var query2 = `UPDATE agent SET tel_id = "`+data.id+`"  WHERE id ="`+query1[0].id+`"`;
     console.log(query2);
     connection.query(query2, function(error, datas){

     });
     var msg=`hey `+name+` Your telegram Connected Successfully `
     }else{
      var msg=`hey `+name+` Your telegram Allready Connected Talk @Reward_Tree`;
     }
    }else{
      var msg=`hey  Your Details Not Avaibles in Our Database Talk @Reward_Tree`;
    }
     socket.emit('connectsucce',{tel_id:data.id, msg:msg,msg_id:data.msg_id})


    });
   });



   //send

   socket.on('send',(senddtaa) =>{
    var senddtaaquery1 = `SELECT * FROM humman_msg_any where chatbot_id="`+senddtaa.bot_id+`" AND chat_id="`+senddtaa.chat_id+`"`;
    connection.query(senddtaaquery1, function(error, datas){
console.log("drdf"+senddtaaquery1)
      if(datas.length>=1){
     if(datas.length==1){
    if( datas[0].status=="1"){
      const time = new Date()

    var inserquarry=`INSERT INTO humman_msg_any (id, chatbot_id, msg, chat_id, agent, time, status, browser_agent) VALUES (NULL, '`+senddtaa.bot_id+`', '`+senddtaa.msg+`', '`+senddtaa.chat_id+`', '', '`+time+`', '2', '0');`
    connection.query(inserquarry)
    var getagent = `SELECT * FROM agent where bot_id="`+senddtaa.bot_id+`"`;
    console.log(getagent);
    connection.query(getagent, function(error, results, fields){
      console.log("drdf"+inserquarry)
      results.forEach((row) => {
        // Access data in each row
        console.log(row);
        if(row.tel_id==""){
    socket.broadcast.emit(String(senddtaa.bot_id) + String(row.id),{msg:senddtaa.msg,type:"1",chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:row.id});
        }else{
            console.log(String(senddtaa.bot_id) + String(row.id));
          socket.broadcast.emit(String(senddtaa.bot_id) + String(row.id),{msg:senddtaa.msg,type:"1",chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:row.id});
    socket.broadcast.emit('accept_tel',{msg:senddtaa.msg,tel_id:row.tel_id,chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:row.id});
            
        }
     
        
      });

    })

    }

     }else{
	      const time = new Date()
var senddtaaquery2 = `SELECT * FROM humman_msg_any where chatbot_id="`+senddtaa.bot_id+`" AND chat_id="`+senddtaa.chat_id+`" AND status="2"`;
  connection.query(senddtaaquery2, function(error, datas){
	  console.log(datas+"  $  "+datas.length)
     if(datas.length>=1){
  if( datas[0].agent==""){
 var inserquarry=`INSERT INTO humman_msg_any (id, chatbot_id, msg, chat_id, agent, time, status, browser_agent) VALUES (NULL, '`+senddtaa.bot_id+`', '`+senddtaa.msg+`', '`+senddtaa.chat_id+`', '', '`+time+`', '3', '0');`
    connection.query(inserquarry)
	  


  }else{
var inserquarry4=`INSERT INTO humman_msg_any (id, chatbot_id, msg, chat_id, agent, time, status, browser_agent) VALUES (NULL, '`+senddtaa.bot_id+`', '`+senddtaa.msg+`', '`+senddtaa.chat_id+`', '`+datas[0].agent+`', '`+time+`', '3', '0');`
    connection.query(inserquarry4)
  socket.broadcast.emit(String(senddtaa.bot_id) + String(datas[0].agent),{msg:senddtaa.msg,type:"3",chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:datas[0].agent});
  	  
  }

	     


     }
	  

  });
     }

      }else{

      }

    });

   });



   socket.on('accepted',(acceptedaa) =>{
        //let ggdhgd=acceptedaa.chat_id+' this chat is already accepted by someone';
         // socket.broadcast.emit('XOICJDDUJV',{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,tel_id:acceptedaa.type_val})
    console.log(acceptedaa)
    var senddtaaquery1 = `SELECT * FROM humman_msg_any where chatbot_id="`+acceptedaa.bot_id+`" AND chat_id="`+acceptedaa.chat_id+`" AND status="2"`;
    connection.query(senddtaaquery1, function(error, datas){
      console.log("drdf"+senddtaaquery1)
      if(datas.length>0){

        if(datas[0].agent==""){
        
          if(acceptedaa.type=="pannel"){
            var getagentsec = `SELECT * FROM agent where bot_id="`+acceptedaa.bot_id+`" AND id="`+acceptedaa.agent_id+`"`;
           console.log(getagentsec)
            connection.query(getagentsec, function(error, getagentsecdata){
               

if(getagentsecdata.length>=1){
var qugupadehd=`UPDATE humman_msg_any SET agent = '`+getagentsecdata[0].id+`' WHERE chatbot_id="`+acceptedaa.bot_id+`" AND chat_id="`+acceptedaa.chat_id+`" AND status!="1"`;
connection.query(qugupadehd);
let ggdhgd=acceptedaa.chat_id+" accepted"
    
            socket.broadcast.emit(String(acceptedaa.bot_id) + String(getagentsecdata[0].id),{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,type:"2",status:"1"})
let setmsg="hey I am "+getagentsecdata[0].name+". I will assist You";
            socket.broadcast.emit(acceptedaa.chat_id,{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:setmsg,type:'user',msg_type:'notify'})
}
          
          });
          
          }

        }else{

          if(acceptedaa.type=="pannel"){
            let ggdhgd=acceptedaa.chat_id+' this chat is already accepted by someone';
            console.log("hbujjn"+ggdhgd+acceptedaa.type_val);
           socket.broadcast.emit(String(acceptedaa.bot_id) + String(acceptedaa.agent_id),{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,type:"2",status:"0"})
   
          }
        }





      }

    })


   });

  
})
