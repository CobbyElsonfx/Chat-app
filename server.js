const express =  require("express")
const path = require("path")
const port = process.env.PORT || 3000  // lookes if we have an environment variable name called Port and uses that 

//create a variable called app and set it to express
const app = express()

app.use(express.static(path.join(__dirname, "public")))
//reading the public dir


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}) 