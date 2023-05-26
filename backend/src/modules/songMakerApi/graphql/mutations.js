import { GraphQLString } from 'graphql';
import { RhythmInputType, UserSongInputType } from './types';
import modelsExported from '../models/exports';
import { ValidationError } from '../../Errors/errorsController';

//Mongoose models
const { User, Rhythm, Song } = modelsExported;

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

    if (rhythm === 'undefined') {
      throw new ValidationError(
        `Data required: rhythm arg is needed in: ${functionName}`
      );
    }

    try {
      const rhythmInstance = new Rhythm(rhythm);

      await rhythmInstance.save();

      return 'Rhythm inserted successfully';
    } catch (err) {
      console.error(err);

      throw new Error(`Error inserting rhythm in: ${functionName}`);
    }
  },
};

export const insertUserSong = {
  name: 'insertUserSong',
  type: GraphQLString,
  description: 'Insert a user song on database',
  args: {
    userSong: { type: UserSongInputType },
  },
  async resolve(__, args) {
    const functionName = insertUserSong.name;

    const { userSong } = args;

    if (userSong === 'undefined') {
      return `Data required: userSong arg is needed in: ${functionName}`;
    }

    try {
      const songInstance = new Song(userSong);

      let result = await songInstance.save();

      return 'UserSong inserted successfully';
    } catch (err) {
      console.error(err);

      throw new Error(`Error inserting UserSong in: ${functionName}`);
    }
  },
};
