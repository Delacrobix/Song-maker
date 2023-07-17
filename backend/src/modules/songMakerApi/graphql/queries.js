import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { UserSongOutputType, RhythmOutputType } from './types';
import modelsExported from '../models/exports';

const { UserSongInfo, Rhythm, Song } = modelsExported;

export const getAllUserSongs = {
  name: 'getAllUserSongs',
  type: new GraphQLList(UserSongOutputType),
  description:
    'Return a list of users created songs for be displayed on the community songs list',
  async resolve() {
    const functionName = getAllUserSongs.name;

    try {
      const songs = await UserSongInfo.find();

      return songs;
    } catch (err) {
      console.error(err);

      throw new Error(`Error while searching song list in: ${functionName}`);
    }
  },
};

export const findSong = {
  name: 'findSong',
  type: GraphQLString,
  description: 'Returns a user created song by id',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args) {
    const functionName = findSong.name;
    const { id } = args;

    if (id === 'undefined') {
      return `Data required: ID arg is needed in: ${functionName}`;
    }

    try {
      const song = await Song.findById(id);

      return song;
    } catch (err) {
      throw new Error(
        `Error while searching song by id in: ${functionName} ${err}`
      );
    }
  },
};

export const getAllRhythms = {
  name: 'getAllRhythms',
  type: new GraphQLList(RhythmOutputType),
  description:
    'Return the list of rhythm objects that can be used to create songs',
  async resolve() {
    const functionName = getAllRhythms.name;

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
