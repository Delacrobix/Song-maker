import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const PathInputType = new GraphQLInputObjectType({
  name: 'PathInputType',
  description: 'Path of local directory that contains audio files.',
  fields: {
    path: { type: GraphQLString },
  },
});
