# Chat App with Socket.io

![A cute cat](https://www.dropbox.com/s/3rjbbq9v1t6ljau/Screenshot%202023-04-14%20at%202.46.59%20AM.png?dl=0)


## This is a real-time chat application built using Socket.io, Node.js, and Express.
## Live Project: https://letstalk-dvk9.onrender.com
## Installation

### To run the application locally, clone this repository and run the following command to install the necessary dependencies:

npm install

## Usage

To start the server, run the following command:


npm start

This will start the server on http://localhost:3000.

Once the server is running, open your web browser and navigate to http://localhost:3000 to access the chat application.
Features

    Real-time messaging using Socket.io
    Displays active users in the chat room
    Displays when a user joins or leaves the chat room
    Option to choose a username

##  Technologies Used

    Node.js
    Express
    Socket.io
    HTML/CSS

## Things I learn during this tutorial
1. Setting up a connection with Socket.io
   a. Set up a normal express server. 
      i. Require the express  module and save it the variable express
           `
           const express = require("express")

           `  
      ii. Create an instance of the express called app
           `
          const express = require("express")
           const  app = express()
           `
      iii. require the file module which will enable you to read static files(public directory )

           `
           const express = require("express")
           const  app = express()

           const  path = require("path")
           `
       iv. Set up a port you can listen  as your server on  your local maching 
       NB:The process.env.PORT checks if  there is any PORT  availbale  in the env file if not is uses the default port set for it
           `
           const express = require("express")
           const  app = express()
           const  path = require("path")

           const port = process.env.PORT || 3000

           app.use(express.static(path(_dirname,"public")))
           `
        v. Start the server
          `app.listen(port, ()=>{
            console.log(`server started on Port ${port}`)
          })
          `
         
      b. In oder to set up a bidirectional connection with socket.io which is built on top of  websocket
         i. Require the node module http for setting up http connection
         ii. Require and create a websocket function called io

         `
         const server = http.createServer(app)
         const io = socketio(server)
         
         `
        



       c. the qs cdn library can can be used to grab the contents of a url


##  Credits

This project was created following the tutorial from Traversy Media on YouTube.
License

This project is licensed under the MIT License - see the LICENSE file for details.
Author

Andoh Francis
