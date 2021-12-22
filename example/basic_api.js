const path = require('path');
const express = require('express');
const { lightRoute } = require('../index');
const app = express();
const lightrouter = new lightRoute;

const routerFile = path.join(__dirname, '..', 'routes.js');

app.use('/', (req, res, next) => { next() }, lightrouter.build(routerFile) );

app.listen(3000, () => console.log('listening at port 3000'));
