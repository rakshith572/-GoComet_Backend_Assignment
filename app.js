const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const io=require('socket.io')(server);

const events=require('events');
const eventEmitter=new events.EventEmitter();
const path=require('path');
const { Socket } = require('socket.io');

const scraper = require('./getBlogsWithTag');
const {getBlog}=require('./getBlog');
const {getHistory}=require('./getHistory.js');


const {connectDB} = require('./connect.js');

app.use(express.static('./client'));

//get selected Blog
app.get('/blog/:id', (req, res) => {
    getBlog(req.params.id)
    .then(ans=>{
      res.json(ans)
    });
});
// search for Tag
app.get('/search/:tag', (req, res) => {
    scraper
      .searchTag(req.params.tag)
      .then(Blogs => {
        eventEmitter.emit('send-blogs',Blogs);
        res.json('loading');
      });
});

// update to client through web sockets
io.on('connection',(socket)=>{
  socket.emit("log-receive","hi");
  eventEmitter.on('send-blogs',result=>{
      if(result==null){
          socket.emit("log-receive",null);
      }else{
          result.forEach(element => {
              socket.emit("log-receive",element);
          });
      }
  });
});
//get the history
app.get('/history',(req,res)=>{
  getHistory().then(ans=>{
    res.json(ans);
  })
});
const port=5000;

const start=async()=>{
    await connectDB(process.env.MONGO_URI);
    server.listen(port,()=>console.log(`server listening at port ${port}`));
}


start();