import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './graphql/schema';
import { dbConnection } from './db/index';
import '@babel/register';
import dotenv from 'dotenv';
import cors from 'cors';

dbConnection();

dotenv.config({ path: '.env.local' });
const app = express();

app.use(cors());
app.use(
  '/',
  createHandler({
    schema: schema,
  })
);

import('./server.js');
import('./modules/openia-integration/config/apiConfiguration');

module.exports = app;
