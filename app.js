const http = require("http");
const os = require("os");
const path = require("path");
const eventEmitter= require("events");
const {EventEmitter}= require("stream");
console.log("platform:",os.platform());
console.log("Free Memory",os.freemem());
console.log("FIle Name:",path.basename(__filename));
const event = new EventEmitter();
event.on("welcome",()=>console.log("Welcome event triggered!"));
const server=http.createServer((req,res)=>{
    event.emit("Welcome");
    res.end("Hello! Welcome to Node.js Server");
});
server.listen(3000,()=>{
    console.log("Server is runnning at http://localhost:3000");
});