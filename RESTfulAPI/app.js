const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Hello Word!')
});
// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/general', (req, res) => {
    res.send('General');
});

app.get('/api/tools', (req, res) => {
    res.send({arr: [1, 2, 3]});
});

app.get('/api/tools/:id', (req, res) => {
    res.send(`Your tool id is ${req.params.id}`);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));