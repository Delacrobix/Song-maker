import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { test } from "./queries";
import { register } from "./mutations";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    test: test,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The mutation type",
  fields: {
    register,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
