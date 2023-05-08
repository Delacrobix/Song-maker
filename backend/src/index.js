import express from "express";
import routes from "./routes/routes";
import { graphqlHTTP } from "express-graphql";
import {schema} from "./graphql/schema";

const app = express();

app.use(routes);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

import("./server.js");

module.exports = app;
