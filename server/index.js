const express = require('express');
const app = express()
const path = require('path');
require('dotenv').config({path: path.resolve('.env')});
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//connect to db
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.y0sp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err))

//port
const port = process.env.PORT || 8000

//routes
const autentication = require('./routes/autentication')

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',    
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/autentication', autentication)




app.get('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1> <p>Page not found<p>`)
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}...`);
})