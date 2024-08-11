const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
const bodyparser = require('body-parser')
app.use(bodyparser.json())

// Define the routes in index.js
const book_route= require('./routes/bookRoutes')
app.use('/book',book_route) 

// Define auth routes for user
const auth_route = require('./routes/authRoutes')
app.use('/auth',auth_route)


// mongo DB connection
try {
    mongoose.connect(process.env.MONGO_DB_URL)
    console.log("***DB Connected successfully****")
    
} catch (error) {
    console.log("Error",error)    
}

app.get('/auth/reset-password', (req, res) => {
    const { token } = req.query;
    console.log("***token***", token);
    res.redirect(`http://localhost:3000/resetPassword?token=${token}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`)
})

