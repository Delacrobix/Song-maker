import '@babel/register';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import('./config/port');

dotenv.config({ path: '.env.local' });

//MongoDB connection
const { dbConnection } = require('./config/mongo');
dbConnection();

//Redis config
require('./config/redis');

const app = express();

app.use(cors());

const { schema } = require('./schema');

//GraphQL schema config
app.use(
  '/graphql',
  createHandler({
    schema: schema,
  })
);

require('./modules/mediaManager/controllers/redisSave');

export default app;
