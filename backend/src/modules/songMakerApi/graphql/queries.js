import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { SongOutputType, RhythmOutputType } from './types';
import modelsExported from '../models/exports';
import redisClient from '../../../config/redis';

const { Rhythm, Song } = modelsExported;

export const getAllSongs = {
  name: 'getAllSongs',
  type: new GraphQLList(SongOutputType),
  description:
    'Return a list of users created songs for be displayed on the community songs list',
  async resolve() {
    const functionName = getAllSongs.name;

    try {
      // Trying to get the list from redis cache
      const redisData = await redisClient.get('song-maker:communitySongList');

      if (redisData) {
        return JSON.parse(redisData);
      } else {
        const result = await Song.find();

        const songs = result.map((song) => ({
          _id: song._id,
          owner: song.owner,
          songName: song.songName,
          chords: song.chords,
          date: song.date,
          rhythmType: song.rhythmObject,
        }));

        return songs;
      }
    } catch (err) {
      throw new Error(
        `Error while searching song list in: ${functionName} - ${err}`
      );
    }
  },
};

export const getSongsByUserName = {
  name: 'getSongsByUserName',
  type: new GraphQLList(SongOutputType),
  description: 'Return a list of songs by a specific user',
  args: {
    userName: { type: GraphQLString },
  },
  async resolve(__, args) {
    const functionName = getSongsByUserName.name;
    const { userName } = args;

    try {
      const redisData = await redisClient.get('song-maker:communitySongList');

      if (redisData) {
        const songs = JSON.parse(redisData);
        let songsFiltered = [];

        songs.forEach((song) => {
          if (song.owner.toLowerCase() === userName.toLowerCase()) {
            song.id = song._id;

            songsFiltered.push(song);
          }
        });

        return songsFiltered;
      } else {
        const result = await Song.find({ owner: userName });

        const songs = result.map((song) => ({
          _id: song._id,
          owner: song.owner,
          songName: song.songName,
          chords: song.chords,
          date: song.date,
          rhythmType: song.rhythmObject,
        }));

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
  type: SongOutputType,
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
      const allSongsString = await redisClient.get(
        'song-maker:communitySongList'
      );
      const allSongs = JSON.parse(allSongsString);

      const song = await allSongs.find((element) => element._id === id);

      if (song) {
        return song;
      }
    } catch (err) {
      throw new Error(
        `Error getting redis information in: ${functionName} ${err}`
      );
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

        try {
          const rhythmsListString = JSON.stringify(rhythmsList);
          await redisClient.set('song-maker:rhythmList', rhythmsListString);
        } catch (e) {
          console.error(`Error saving on redis database in: ${functionName}`);
        }

        return rhythmsList;
      }
    } catch (err) {
      throw new Error(
        `Error while searching the list of rhythms in: ${functionName}`
      );
    }
  },
};
