import { GraphQLObjectType, GraphQLString } from 'graphql';

export const ChordsGeneratedOutputType = new GraphQLObjectType({
  name: 'ChordsGeneratedOutputType',
  description:
    'This type represents the string generated from the openAI API with the chords',
  fields: {
    chords: { type: GraphQLString },
  },
});
