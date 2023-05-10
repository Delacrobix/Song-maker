import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { test, songList, song } from "./queries";
import { register } from "./mutations";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    test,
    songList,
    song,
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
