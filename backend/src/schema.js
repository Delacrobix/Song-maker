import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getAIChords } from './modules/chordsGenerator/graphql/queries';
import {
  getAllSongs,
  findSong,
  getAllRhythms,
  getSongsByUserName,
} from './modules/songMakerApi/graphql/queries';
import {
  insertRhythm,
  insertSong,
} from './modules/songMakerApi/graphql/mutations';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    getAllSongs,
    findSong,
    getAllRhythms,
    getAIChords,
    getSongsByUserName,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The mutation type',
  fields: {
    insertRhythm,
    insertSong,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
