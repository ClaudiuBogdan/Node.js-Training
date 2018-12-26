const express = require('express');
const app = express();

app.use(express.json());
// app.use(express.bodyParser());
const toolsAvailable = [
    {
        id : 1,
        name: 'Hammer'
    },
    {
        id: 2,
        name: 'Scrwedriver'
    }
];

app.get('/', (req, res) =>{
    res.send('Hello Word!')
});

app.get('/api/general', (req, res) => {
    res.send('General');
});

app.get('/api/tools', (req, res) => {
    res.send({arr: [1, 2, 3]});
});

app.get('/api/tools/:id', (req, res) => {
    const tool = toolsAvailable.find( c => c.id === parseInt(req.params.id));
    if(!tool) res.status(404).send('Resource not found');
    res.send(tool);
});

app.post('/api/tools', (req, res) => {
    const tool = {
        id: toolsAvailable.length + 1,
        name: req.body.name
    }
    toolsAvailable.push(tool);
    res.send(tool);
});

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Listening on port ${port}`));