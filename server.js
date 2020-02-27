const express = require('express');
const routes = require('./src/routes');

require('./src/database');

const app = express();

app.listen(process.env.PORT);
app.use(express.json());
app.use(routes);
