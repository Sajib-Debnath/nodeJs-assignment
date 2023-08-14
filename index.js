const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000


//users data
const { users } = require('./data/users.json');



//middleware
app.use(express.json())





//all routes//////////
/////////////////////


// this route to get all users
app.get('/user/all', (req, res) => {
    const { limit } = req.query
    const limitingUsers = users.slice(0, limit)
    if (limit) {
        res.send(limitingUsers)
    } else {
        res.send(users)
    }

})






//this route to get random user
app.get('/user/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 10)
    Number(randomNumber)
    if (randomNumber === 0) {
        res.send(users[0])
    }
    else {
        const randomUser = users.find(singleUser => randomNumber === singleUser.id)
        res.send(randomUser)
    }
})





//this route to post a user
app.post('/user/save', (req, res) => {
    console.log(req.body)
    const singleUser = req.body;
    //make sure all property value are present
    for (const key in singleUser) {
        if (singleUser[key] === '' || singleUser[key] === null) {
            return res.send(`Please give ${key}'s value`)
        }
    }
    const id = users.length + 1
    singleUser.id = id
    users.push(singleUser)
    res.send(users)
})








//this route update a user information based on user id pass by params and
//To update property value use Query
app.patch("/user/update/:id", (req, res) => {
    const { id } = req.params;
    //validating id is a number
    if (isNaN(id) == false) {
        let updatingKey = Object.keys(req.query)[0]
        const updatingValue = req.query[updatingKey];
        const updatingUser = users.find(singleUser => singleUser.id === Number(id))
        updatingUser[updatingKey] = updatingValue
        res.send(users)
    }
    else {
        res.send("Either you send a string or boolean value as id")
    }
})



//this is route to update more than one users
app.patch("/user/update/:id", (req, res) => {
    const updatingIds = req.body;
    let updatingUser;
    updatingIds.forEach(singleUserId => {
        updatingUser = users.forEach(singleUpdatingUser => {
            singleUpdatingUser === Number(singleUserId)
        })
    })


    res.send(users)
})




//this route to delete a user based on user id pass by params
app.delete("/user/delete/:id", (req, res) => {
    const { id } = req.params
    const remainingUser = users.filter(singleUser => singleUser.id !== Number(id))
    if (remainingUser.length < users.length) {
        res.send(remainingUser)
    }
    else {
        res.send("This user already deleted or not available")
    }
})






app.get('/', (req, res) => {
    res.send("Home")
})



app.listen(port, () => {
    console.log(`Port is listening to you ${port}`)
})





