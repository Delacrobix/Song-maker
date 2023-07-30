import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';

export const ChordInputType = new GraphQLInputObjectType({
  name: 'ChordInputType',
  description: 'This type represents a chord with its duration and inversion',
  fields: {
    chordName: { type: GraphQLString },
    seventh: { type: GraphQLString },
    inversion: { type: GraphQLInt },
    duration: { type: GraphQLFloat },
  },
});

export const ChordOutputType = new GraphQLObjectType({
  name: 'ChordOutputType',
  description: 'This type represents a chord with its duration and inversion',
  fields: {
    chordName: { type: GraphQLString },
    seventh: { type: GraphQLString },
    inversion: { type: GraphQLInt },
    duration: { type: GraphQLFloat },
  },
});

export const RhythmOutputType = new GraphQLObjectType({
  name: 'RhythmOutputType',
  description:
    'This type represents one rhythm with its duration and chords (output)',
  fields: {
    rhythmName: { type: GraphQLString },
    tempo: { type: GraphQLInt },
    score: { type: new GraphQLList(ChordOutputType) },
  },
});

export const RhythmInputType = new GraphQLInputObjectType({
  name: 'RhythmInputType',
  description:
    'This type represents one rhythm with its duration and chords (input)',
  fields: {
    rhythmName: { type: GraphQLString },
    tempo: { type: GraphQLInt },
    score: { type: new GraphQLList(ChordInputType) },
  },
});

export const InsertSongResponseType = new GraphQLObjectType({
  name: 'InsertSongResponseType',
  description: 'This type is used to return song id when the song is created',
  fields: {
    id: { type: GraphQLID },
  },
});

export const SongInputType = new GraphQLInputObjectType({
  name: 'SongInputType',
  description:
    'This type is used to model a song with its playable information (input)',
  fields: {
    owner: { type: GraphQLString },
    songName: { type: GraphQLString },
    chords: { type: GraphQLString },
    rhythmType: { type: RhythmInputType },
    date: { type: GraphQLString },
  },
});

export const SongOutputType = new GraphQLObjectType({
  name: 'SongOutputType',
  description:
    'This type is used to model a song with its playable information (output)',
  fields: {
    _id: { type: GraphQLID },
    owner: { type: GraphQLString },
    songName: { type: GraphQLString },
    chords: { type: GraphQLString },
    rhythmType: { type: RhythmOutputType },
    date: { type: GraphQLString },
  },
});
