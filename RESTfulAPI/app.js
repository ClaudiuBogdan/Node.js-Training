const express = require('express');
const toolsApi = require('./routes/tools');
const homeApi = require('./routes/home');
const app = express();

app.use(express.json());
app.use('/api/tools', toolsApi);
app.use('/', homeApi);

const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Listening on port ${port}`));