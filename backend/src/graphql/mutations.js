import { GraphQLString } from 'graphql';
import modelsExported from '../models/exports';
import { RhythmInputType } from './types';

//Mongoose models
const { User, Rhythm, Song } = modelsExported;

export const register = {
  type: GraphQLString,
  description: 'Register a new user',
  args: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { userName, email, password } = args;

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    console.log('New user: ', newUser);
    return 'New user created';
  },
};

export const insertRhythm = {
  type: GraphQLString,
  description: 'This mutation creates a row in the rhythm database',
  args: {
    rhythm: { type: RhythmInputType },
  },
  async resolve(__, args) {
    // const functionName = Object.getPrototypeOf(this).constructor.name;
    const { rhythm } = args;

    if (rhythm === undefined) {
      return `Data required: RHYTHM arg is needed in: {functionName}`;
    }

    try {
      const rhythmInstance = new Rhythm(rhythm);

      const result = await rhythmInstance.save();
      console.log(result);
      return 'Rhythm inserted successfully';
    } catch (err) {
      console.error(err);

      throw new Error(`Error inserting rhythm in: {functionName}`);
    }
  },
};

console.log('RHYTHM: ', Rhythm);
