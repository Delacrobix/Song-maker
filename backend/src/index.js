import express from "express";
import routes from "./routes/routes";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphql/schema";
import { dbConnection } from "./db/index";
import "@babel/register";
import dotenv from "dotenv";
import cors from "cors";

dbConnection();

dotenv.config({ path: ".env.local" });
const app = express();

const REACT_ORIGIN = process.env.REACT_ORIGIN;

app.use(cors());
app.use(
  "/",
  createHandler({
    schema: schema,
  })
);
app.use(routes);

import("./server.js");

module.exports = app;
