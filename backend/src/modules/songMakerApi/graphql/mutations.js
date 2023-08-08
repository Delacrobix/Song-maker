import { GraphQLString } from 'graphql';
import {
  RhythmInputType,
  SongInputType,
  InsertSongResponseType,
} from './types';
import modelsExported from '../models/exports';
import { DataMutationError } from '../Errors/errorsController';
import {
  rhythmValidation,
  SongValidation,
} from '../validations/dataValidations';
import redisClient from '../../../config/redis';

//Mongoose models
const { Rhythm, Song } = modelsExported;

export const insertRhythm = {
  name: 'insertRhythm',
  type: GraphQLString,
  description: 'This mutation creates a row in the rhythm database',
  args: {
    rhythm: { type: RhythmInputType },
  },
  async resolve(__, args) {
    const functionName = insertRhythm.name;

    const { rhythm } = args;

    rhythmValidation(functionName, rhythm);

    try {
      const rhythmInstance = new Rhythm(rhythm);
      await rhythmInstance.save();

      //Updating redis database
      try {
        const rhythmsList = await Rhythm.find();
        const rhythmsListString = JSON.stringify(rhythmsList);

        await redisClient.set('song-maker:rhythmList', rhythmsListString);
      } catch (e) {
        throw new DataMutationError(
          `Error saving redis information in: ${functionName} ${err}`
        );
      }

      return true;
    } catch (err) {
      throw new DataMutationError(
        `Error inserting rhythm in: ${functionName} ${err}`
      );
    }
  },
};

export const insertSong = {
  name: 'insertSong',
  type: InsertSongResponseType,
  description: 'Insert a song and userSongInfo on database',
  args: {
    song: { type: SongInputType },
  },
  async resolve(__, args) {
    const functionName = insertSong.name;
    const { song } = args;

    SongValidation(functionName, song);

    const [day, month, year] = song.date.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    song.date = date;

    try {
      //Changing the name of object property
      const aux = song.rhythmType;
      delete song.rhythmType;
      song.rhythmObject = aux;

      //Saving song
      const songInstance = new Song(song);
      const songResult = await songInstance.save();

      //Updating redis info
      try {
        const result = await Song.find();

        const songs = result.map((song) => ({
          _id: song._id,
          owner: song.owner,
          songName: song.songName,
          chords: song.chords,
          date: song.date,
          rhythmType: song.rhythmObject,
        }));

        const songsString = JSON.stringify(songs);

        await redisClient.set('song-maker:communitySongList', songsString);
      } catch (err) {
        throw new DataMutationError(
          `Error updating redis info in: ${functionName} ${err}`
        );
      }

      return { id: songResult._id };
    } catch (err) {
      throw new DataMutationError(
        `Error inserting Song in: ${functionName} ${err}`
      );
    }
  },
};
