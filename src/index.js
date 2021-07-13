const express = require('express');
const mongoose = require('mongoose');
const app = express();

const mongoURI = 'mongodb+srv://admin:passwordpassword@cluster0.egztl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance :)');
});

mongoose.connection.on('error', (err)=> {
    console.log('There was an error connecting to mongo instance :/', err);
});

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});