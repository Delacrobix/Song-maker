import { GraphQLString } from 'graphql';
import { RhythmInputType, SongInputType } from './types';
import modelsExported from '../models/exports';
import { DataMutationError } from '../Errors/errorsController';
import {
  rhythmValidation,
  SongValidation,
} from '../validations/dataValidations';

//Mongoose models
const { UserSongInfo, Rhythm, Song } = modelsExported;

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

      return true;
    } catch (err) {
      console.error(err);

      throw new DataMutationError(`Error inserting rhythm in: ${functionName}`);
    }
  },
};

export const insertSong = {
  name: 'insertSong',
  type: GraphQLString,
  description: 'Insert a song and userSongInfo on database',
  args: {
    song: { type: SongInputType },
  },
  async resolve(__, args) {
    const functionName = insertSong.name;

    const { song } = args;

    SongValidation(functionName, userSong);

    const chordList = '';

    //Extract the information from the song
    song.rhythm.foreach((item) => {
      chordList += item.chordName + item.seventh + '|';
    });

    const songInfo = {
      owner: song.owner,
      songName: song.songName,
      rhythm: song.rhythm.rhythmName,
      chords: chordList,
      date: song.date,
    };

    try {
      const songInstance = new Song(song);
      const userSongInfoInstance = new UserSongInfo(songInfo);

      //Saving song information
      let userSongResult = await userSongInfoInstance.save();
      //Saving song
      let songResult = await songInstance.save();

      return true;
    } catch (err) {
      console.error(err);

      throw new DataMutationError(`Error inserting Song in: ${functionName}`);
    }
  },
};
