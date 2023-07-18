import { GraphQLString } from 'graphql';
import { chordsPrompt } from '../controllers/utils';
import { openAIchordRequest } from '../controllers/completions';

export const getAIChords = {
  name: 'getAIChords',
  type: GraphQLString,
  description: 'Return to client the chords generated from the AI',
  args: {
    tonality: { type: GraphQLString },
  },
  async resolve(__, args) {
    const { tonality } = args;
    const prompt = chordsPrompt(tonality);

    const result = await openAIchordRequest(prompt);

    console.log('result: ', result);

    return result;
  },
};
