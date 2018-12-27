const express = require('express');
const mongoos = require('mongoose');

const app = express();

//DB config 
const db = require('./config/keys').mongoURI;
//Connect to mongoDB 
mongoos
    .connect(db)
    .then(() => console.log('MongoDB connected to ', db))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World fron Nodemon!');
});

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Server running on port ${port}`));