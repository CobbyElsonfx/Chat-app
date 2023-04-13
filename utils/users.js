users = []

const userJoin = (id,username,room) =>{
     const user =  {id,username,room}

     users.push(user)

     return user
}
//this is 
const getCurrentUser = (id)=>{
    return users.find(user => user.id === id)
}

//So, the [0] is used to extract the user object that was removed from 
//the users array and return it directly, instead of returning an array with one element
// containing the user object. Without the [0], the userLeave() function would return an array
// with one 
//element containing the user object, which might not be desirable in some situations.
const userLeave = (id) =>{
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}


//o, in summary, the getRoomUsers() function takes a
// room parameter, searches the users array for
 //all user objects whose room property is equal to the room parameter
const getRoomUsers = (room)=>{
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}
    
