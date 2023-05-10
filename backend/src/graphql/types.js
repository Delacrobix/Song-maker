import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const SongType = new GraphQLObjectType({
  name: "SongType",
  description:
    "Data type for a song that will be in a table with all community songs.",
  fields: {
    userName: { type: GraphQLString },
    songName: { type: GraphQLString },
    rhythm: { type: GraphQLString },
    chords: { type: GraphQLString },
    date: { type: GraphQLString },
    id: { type: GraphQLID },
  },
});
