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
    console.log(message)
    // var query = `SELECT * FROM hummanbot where bot_id="`+message.chat_id+`"`;
    // socket.broadcast.emit('receive',{message: message.msg, id: message.id, chat_id: message.chat_id })
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

        }else{
            socket.broadcast.emit('pannel',{msg:senddtaa.msg,tel_id:row.tel_id,chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:row.id});
    socket.broadcast.emit('accept_tel',{msg:senddtaa.msg,tel_id:row.tel_id,chat_id:senddtaa.chat_id,bot_id:senddtaa.bot_id,agent_id:row.id});
            
        }
     
        
      });

    })

    }

     }else{
//dfhiudhuirg

     }

      }else{

      }

    });

   });



   socket.on('accepted',(acceptedaa) =>{
        let ggdhgd=acceptedaa.chat_id+' this chat is already accepted by someone';
          socket.broadcast.emit('XOICJDDUJV',{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,tel_id:acceptedaa.type_val})
    console.log(acceptedaa)
    var senddtaaquery1 = `SELECT * FROM humman_msg_any where chatbot_id="`+acceptedaa.bot_id+`" AND chat_id="`+acceptedaa.chat_id+`" AND status="2"`;
    connection.query(senddtaaquery1, function(error, datas){
      console.log("drdf"+senddtaaquery1)
      if(datas.length>0){

        if(datas[0].agent==""){
        
          if(acceptedaa.type=="tel"){
            var getagentsec = `SELECT * FROM agent where bot_id="`+acceptedaa.bot_id+`" AND id="`+acceptedaa.agent_id+`" AND tel_id="`+acceptedaa.type_val+`"`;
           console.log(getagentsec)
            connection.query(getagentsec, function(error, getagentsecdata){

if(getagentsecdata.length>=1){
var qugupadehd=`UPDATE humman_msg_any SET agent = '`+getagentsecdata[0].id+`' WHERE chatbot_id="`+acceptedaa.bot_id+`" AND chat_id="`+acceptedaa.chat_id+`" AND status="2"`;
connection.query(qugupadehd);
let ggdhgd=acceptedaa.chat_id+" this chat is successfully accepted by you"
            socket.broadcast.emit('XOICJDDUJV',{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,tel_id:acceptedaa.type_val})
let setmsg="hey I am "+getagentsecdata[0].name+". I will assist You";
            socket.broadcast.emit(acceptedaa.chat_id,{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:setmsg,type:'user',msg_type:'notify'})
}
          
          });
          
          }

        }else{

          if(acceptedaa.type=="tel"){
            let ggdhgd=acceptedaa.chat_id+' this chat is already accepted by someone';
            console.log("hbujjn"+ggdhgd+acceptedaa.type_val);
            socket.broadcast.emit('XOICJDDUJV',{chat_id:acceptedaa.chat_id,bot_id:acceptedaa.bot_id,msg:ggdhgd,tel_id:acceptedaa.type_val});
           // socket.broadcast.emit('accept_tel',"hrhjniuguyguy",function(confirmation){ console.log(confirmation)})
          }
        }





      }

    })


   });

  
})
