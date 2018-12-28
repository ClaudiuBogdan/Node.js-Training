const express = require('express');
const mongoos = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Server running on port ${port}`));