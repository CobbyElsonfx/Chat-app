const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector(".chat-messages")
const loginForm = document.querySelector("form")



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

socket.on("message" , message =>{ //catch the message from the server 
    console.log(message)
    //chatmessage content 
    //define a function that will return the messages by manipulatin the dom
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrolllHeight //set the chatmessages div to the height of whatever the chatmessages height is

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

