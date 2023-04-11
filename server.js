const express =  require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const port = process.env.PORT || 3000  // lookes if we have an environment variable name called Port and uses that 
const {formatMessages} = require("./utils/messages")

//create a variable called app and set it to express
const app = express()

app.use(express.static(path.join(__dirname, "public")))
//reading the public dir

const server = http.createServer(app)
const io = socketio(server) //create and install of a websocket function called io

//run when a client connects  that is listens to an event 
// A socket is a communication endpoint
// that allows two programs to talk to each other over a network.
// It's like a telephone line that enables two people to talk to each other. 
//In the context of web development, a socket allows the client-side (browser) 
//and server-side (backend) to communicate in real-time, sending data back and forth 
//instantly without the need for the client to refresh the page. This is useful for applications 
//that require real-time updates, such as chat rooms, online gaming, and stock trading platform

const defaultUser = "Chat bot"

io.on("connection", socket =>{
    console.log("New Websocket connection")
    //emit message
    socket.emit("message", formatMessages(defaultUser , "Welcome to Chat Cord"))  // only the client that is connection
    socket.broadcast.emit("message", "A user has joined the chat") //emit to all clients except the user
    socket.on("diconnect", ()=>{
        io.emit("message", formatMessages(defaultUser, "A user has joined the Chat Cord"))
    })
    
    //listen to chatmessage event and emit it back to the client as message // and this will pass through the listening functio in the mainjs
    socket.on("chatMessage" , (msg)=>{
        io.emit("message", formatMessages("user", msg) )
    })
})



server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}) 