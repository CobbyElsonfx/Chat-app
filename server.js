const express =  require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const port = process.env.PORT || 3000  // lookes if we have an environment variable name called Port and uses that 
const {formatMessages} = require("./utils/messages")
const {userJoin,getCurrentUser,userLeave , getRoomUsers} = require("./utils/users") 

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
    socket.on("joinRoom", ({username,room})=>{
    const user = userJoin(socket.id,username,room)

    socket.join(user.room)


    socket.emit("message", formatMessages(defaultUser , "Welcome to Chat Cord"))  // only the client that is connection
    socket.broadcast.to(user.room).emit("message",  formatMessages(defaultUser , `${user.username} has joined the chats`)) //emit to all clients except the user
    //send users room and its users
    //The code you provided is emitting a socket event called "roomUsers" to all clients connected to the socket.io server, specifically to all clients in the same room as the user who triggered the event. The event payload contains an object with two properties: "room", which is the name of the room, and "users", which is an array of user objects in the 
    //room. The "getRoomUsers" function is being called to retrieve the list of users in the room.
    io.to(user.room).emit("userRoom", {
        room: user.room,
        activeUsers: getRoomUsers(room) //checkts for the presents of the users in the passed room and it returns an array of users
    })

    })

    //emit message
    
   
    
    //listen to chatmessage event and emit it back to the client as message // and this will pass through the listening function in the mainjs
    socket.on("chatMessage" , (msg)=>{
        const users = getCurrentUser(socket.id)
        io.to(users.room).emit("message", formatMessages(users.username, msg) )
    })

    socket.on("disconnect", ()=>{
        const user = userLeave(socket.id)
        if(user){
            io.to(user.room).emit("message", formatMessages(defaultUser, `${user.username}  has left the Chat Cord`))
        }
    })

})



server.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}) 