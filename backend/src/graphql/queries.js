import { GraphQLString } from "graphql";

export const test = {
  type: GraphQLString,
  description: "Returns a string",
  resolve: () => "This is a test",
};
