import { GraphQLString } from "graphql";

export const hello = {
  type: GraphQLString,
  description: "Returns a string",
  resolve: () => "hello world",
};
