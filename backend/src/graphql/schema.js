import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { hello } from "./queries";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    hello: hello,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});

