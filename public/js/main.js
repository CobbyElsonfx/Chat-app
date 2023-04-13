const chatForm = document.getElementById('chat-form')
const chatMessages = document.getElementById("chat-messages")
const loginForm = document.querySelector("form")
const roomName = document.getElementById("room-name")
const userList = document.getElementById("users")



const outPutRoom  = ()=>{
    roomName.innerHTML = room

}

const outPutUsers = (activeUsers) => {
    console.log( activeUsers)
    const users = activeUsers.map(user => `<li style="position:relative"><span style="position:abolute;bottom-0"><svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24" id="user-6" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M13,12H11a8,8,0,0,0-8,8,2,2,0,0,0,2,2H19a2,2,0,0,0,2-2A8,8,0,0,0,13,12Z" style="fill: #ffffff;"></path><circle id="primary" cx="12" cy="8" r="6" style="fill: #424242;"></circle></g></svg></span>${user.username}</li>`).join("")
    userList.innerHTML = users

}
//AN ALTERNATIVE FOR GRABBING THE URL AND ITS VALUES 
// /const urlString = window.location.href;
// const url = new URL(urlString);
// const searchParams = new URLSearchParams(url.search);
// const param1 = searchParams.get('param1');
// const param2 = searchParams.get('param2');

// console.log(param1); // Output: the value of param1
// console.log(param2); // Output: the value of param2

const {username , room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})



const outputMessage = (msg)=>{
 const div = document.createElement("div")
 div.classList.add("message") // give class mesage
 div.innerHTML = `
 <p class="meta">${msg.username} <span>${msg.time}</span></p>
<p class="text"> ${msg.text}     </p>
 `
document.querySelector(".chat-messages").appendChild(div) // add new div

}




const socket = io()

//emit room event
socket.emit("joinRoom" , {username,room})

socket.on("userRoom" , ({ activeUsers,room})=>{
    outPutRoom(room)
    outPutUsers( activeUsers)
})


socket.on("message" , message =>{ //catch the message from the server 
    console.log(message)
    //chatmessage content 
    //define a function that will return the messages by manipulatin the dom
    outputMessage(message)
     //set the chatmessages div to the height of whatever the chatmessages height is
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//creating an event listener for the chat submit button
// will have to explain how the value was retrieved without using the getElement by id.value stuff


chatForm.addEventListener("submit", (ev)=>{
    ev.preventDefault()


    //ev.targets.elements of the forms with id msg and gets the value 
    const msg = ev.target.elements.msg.value

    //emit and event call chatmessage and listens to it in the main js file
    socket.emit("chatMessage", msg)
    //clear input
    ev.target.elements.msg.value = ""
    ev.target.elements.msg.focus()


})


