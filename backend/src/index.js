import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(routes);

import('./server.js');

module.exports = app;