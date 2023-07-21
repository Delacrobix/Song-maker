import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { UserSongOutputType, RhythmOutputType } from './types';
import modelsExported from '../models/exports';
import redisClient from '../../../config/redis';

const { UserSongInfo, Rhythm, Song } = modelsExported;

export const getAllUserSongs = {
  name: 'getAllUserSongs',
  type: new GraphQLList(UserSongOutputType),
  description:
    'Return a list of users created songs for be displayed on the community songs list',
  async resolve() {
    const functionName = getAllUserSongs.name;

    try {
      // Trying to get the list from redis cache
      const redisData = await redisClient.get('song-maker:communitySongList');

      if (redisData) {
        return JSON.parse(redisData);
      } else {
        const songs = await UserSongInfo.find();

        return songs;
      }
    } catch (err) {
      throw new Error(
        `Error while searching song list in: ${functionName} - ${err}`
      );
    }
  },
};

export const getAllSongsByUserName = {
  name: 'getAllSongsByUserName',
  type: new GraphQLList(UserSongOutputType),
  description: 'Return a list of songs by a specific user',
  args: {
    userName: { type: GraphQLString },
  },
  async resolve(__, args) {
    const functionName = getAllSongsByUserName.name;
    const { userName } = args;

    try {
      const redisData = await redisClient.get('song-maker:communitySongList');

      if (redisData) {
        const songs = JSON.parse(redisData);
        let songsFiltered = [];

        songs.forEach((song) => {
          if (song.owner === userName) {
            song.id = song._id;

            songsFiltered.push(song);
          }
        });

        return songsFiltered;
      } else {
        const songs = await UserSongInfo.find({ owner: userName });

        return songs;
      }
    } catch (err) {
      throw new Error(
        `Error while searching song list in: ${functionName} - ${err}`
      );
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
      // Trying to get the list from redis cache
      const redisData = await redisClient.get('song-maker:rhythmList');

      if (redisData) {
        return JSON.parse(redisData);
      } else {
        const rhythmsList = await Rhythm.find();

        return rhythmsList;
      }
    } catch (err) {
      throw new Error(
        `Error while searching the list of rhythms in: ${functionName}`
      );
    }
  },
};
