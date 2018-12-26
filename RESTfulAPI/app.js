const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());
// app.use(express.bodyParser());
let id = 0;
const toolsAvailable = [
    {
        id : id++,
        name: 'Hammer'
    },
    {
        id: id++,
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
    res.send(toolsAvailable);
});

app.get('/api/tools/:id', (req, res) => {
    const tool = toolsAvailable.find( c => c.id === parseInt(req.params.id));
    if(!tool) {
        res.status(404).send('Resource not found');
        return;
    }
    res.send(tool);
});

app.post('/api/tools', (req, res) => {
    //Code validation

    const {error} = validateTool(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    //Item creation
    const tool = {
        id: id++,
        name: req.body.name
    }
    toolsAvailable.push(tool);
    res.send(tool);
});

app.put('/api/tools/:id', (req, res) => {
    const tool = toolsAvailable.find( c => c.id === parseInt(req.params.id));
    if(!tool) {
        res.status(404).send('Resource not found');
        return;
    }

    const {error} = validateTool(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    tool.name = req.body.name;
    res.send(tool);
});

app.delete('/api/tools/:id', (req, res) => {
    const tool = toolsAvailable.find( c => c.id === parseInt(req.params.id));
    if(!tool) {
        res.status(404).send('Resource not found');
        return;
    }

    const index = toolsAvailable.indexOf(tool);
    toolsAvailable.splice(index, 1);

    res.send("Deleted succesfuly. Index: " + index);
});

const validateTool = (tool) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(tool, schema);
};

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Listening on port ${port}`));