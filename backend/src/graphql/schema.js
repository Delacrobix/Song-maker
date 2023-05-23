import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getAllUserSongs, findSong, getAllRhythms } from './queries';
import { register, insertRhythm } from './mutations';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    getAllUserSongs,
    findSong,
    getAllRhythms,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The mutation type',
  fields: {
    register,
    insertRhythm,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
