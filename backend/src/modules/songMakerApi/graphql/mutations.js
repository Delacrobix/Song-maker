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
import moment from 'moment';
import redisClient from '../../../config/redis';

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

    let chordList = '';

    //Extract the information from the song
    song.rhythmType.score.forEach((item) => {
      if (item.chordName !== 'rst') {
        chordList += item.chordName + item.seventh + '|';
      }
    });

    song.date = moment(song.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    try {
      //Changing the name of object property
      const aux = song.rhythmType;
      delete song.rhythmType;
      song.rhythmObject = aux;

      //Saving song
      const songInstance = new Song(song);
      const songResult = await songInstance.save();

      const songInfo = {
        owner: song.owner,
        songName: song.songName,
        rhythm: song.rhythmObject.rhythmName,
        chords: chordList,
        date: song.date,
        refId: songResult.id,
      };

      //Saving song information
      const userSongInfoInstance = new UserSongInfo(songInfo);
      const userSongResult = await userSongInfoInstance.save();

      //Updating redis info
      try {
        const allSongs = await UserSongInfo.find();
        const allUserSongsString = JSON.stringify(allSongs);

        await redisClient.set(
          'song-maker:communitySongList',
          allUserSongsString
        );
      } catch (err) {
        throw new DataMutationError(
          `Error updating redis info in: ${functionName} ${err}`
        );
      }

      return { id: userSongResult.id };
    } catch (err) {
      throw new DataMutationError(
        `Error inserting Song in: ${functionName} ${err}`
      );
    }
  },
};
