const express = require('express');
const routes = require('./src/routes');

require('./src/database');

const app = express();

app.listen(process.env.PORT || 3333);
app.use(express.json());
app.use(routes);
