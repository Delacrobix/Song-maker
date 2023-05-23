import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { UserSongType, RhythmOutputType } from './types';
import modelsExported from '../models/exports';

const { User, Rhythm, Song } = modelsExported;

export const getAllUserSongs = {
  type: new GraphQLList(UserSongType),
  description:
    'Return a list of users created songs for be displayed on the community songs list',
  async resolve() {
    const functionName = Object.getPrototypeOf(this).constructor.name;

    try {
      const songs = await Song.find();

      return songs;
    } catch (err) {
      console.error(err);

      throw new Error(`Error while searching song list in ${functionName}`);
    }
  },
};

export const findSong = {
  type: GraphQLString,
  description: 'Returns a user created song by id',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args) {
    const functionName = Object.getPrototypeOf(this).constructor.name;
    const { id } = args;

    if (id === 'undefined') {
      return `Data required: ID arg is needed in: ${functionName}`;
    }

    try {
      const song = await Song.findById(id);

      return song;
    } catch (err) {
      console.error(err);

      throw new Error(`Error while searching song by id in ${functionName}`);
    }
  },
};

export const getAllRhythms = {
  type: new GraphQLList(RhythmOutputType),
  description:
    'Return the list of rhythm objects that can be used to create songs',
  async resolve() {
    const functionName = Object.getPrototypeOf(this).constructor.name;

    try {
      const rhythmsList = await Rhythm.find();

      return rhythmsList;
    } catch (err) {
      console.error(err);

      throw new Error(
        `Error while searching the list of rhythms in: ${functionName}`
      );
    }
  },
};
