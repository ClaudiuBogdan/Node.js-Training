const express = require('express');
const Joi = require('joi');

const router = express.Router();

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


router.get('/', (req, res) => {
    res.send(toolsAvailable);
});

router.get('/:id', (req, res) => {
    const tool = toolsAvailable.find( c => c.id === parseInt(req.params.id));
    if(!tool) {
        res.status(404).send('Resource not found');
        return;
    }
    res.send(tool);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;