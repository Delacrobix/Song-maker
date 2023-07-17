import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getAIChords } from './modules/chordsGenerator/graphql/queries';
import { setAudioFiles } from './modules/mediaManager/graphql/mutations';
import { getAllAudios } from './modules/mediaManager/graphql/queries';
import {
  getAllUserSongs,
  findSong,
  getAllRhythms,
} from './modules/songMakerApi/graphql/queries';
import {
  insertRhythm,
  insertSong,
} from './modules/songMakerApi/graphql/mutations';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    getAllUserSongs,
    findSong,
    getAllRhythms,
    getAIChords,
    getAllAudios,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'The mutation type',
  fields: {
    insertRhythm,
    insertSong,
    setAudioFiles,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
