import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getAllUserSongs, findSong, getAllRhythms } from './queries';
import { insertRhythm, insertUserSong } from './mutations';

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
    insertRhythm,
    insertUserSong,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
