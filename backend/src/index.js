import express from 'express';
import '@babel/register';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import('./server.js');

dotenv.config({ path: '.env.local' });

const { dbConnection } = require('./db/index');
dbConnection();

const app = express();

app.use(cors());

// This import prevents that the schema file charges before the dotenv is loaded
const { schema } = require('./schema');

app.use(
  '/graphql',
  createHandler({
    schema: schema,
  })
);

export default app;
