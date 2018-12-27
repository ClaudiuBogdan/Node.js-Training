const express = require('express');
const mongoose = require('mongoose');

const toolsApi = require('./routes/tools');
const homeApi = require('./routes/home');

const app = express();
mongoose.connect('mongodb://localhost/tools')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connected to MongoDB...', err));

const toolsSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    isAvailable: Boolean
});

const Tool = mongoose.model('ToolsCollection', toolsSchema);

// async function createTool(){
//     const tool = new Tool({
//         name: 'Mosh',
//         cost: 0,
//         isAvailable: true
//     });
// const result = await tool.save();
// console.log(result);   
// };
// createTool();

async function getTool(){
    //eq (equal)
    //ne (not equal)
    //...

    const tools =  await Tool.find()
        .sort({name: 1})
        .select({
                name: 1,
                cost: 1
            }
        );
    console.log(tools);
}

async function updateTool(id){
    const updatedTool = await Tool.findById(id);
    if(!updatedTool) return;

    updatedTool.name = "Updated Tool";
    updatedTool.cost = 1;
    return await updatedTool.save();
    
};

async function run(){
    const result = await updateTool('5c24afcba67f1044c8e6ab08');
    await getTool();

    console.log(result)
}

run();





app.use(express.json());
app.use('/api/tools', toolsApi);
app.use('/', homeApi);

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Listening on port ${port}`));