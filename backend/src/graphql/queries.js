import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { SongType } from "./types";
import modelsExported from "../models/exports";

const { User, Rhythm, Song } = modelsExported;

export const test = {
  type: GraphQLString,
  description: "Returns a string",
  resolve: () => "This is a test",
};

export const songList = {
  type: new GraphQLList(SongType),
  description: "Return a list of songs",
  async resolve() {
    const songs = await Song.find();

    return songs;
  },
};

export const song = {
  type: GraphQLString,
  description: "Returns a single song by id",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args) {
    const song = await Song.findById(args.id);
    return song;
  },
};
