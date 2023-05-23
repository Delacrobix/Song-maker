import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';

export const UserSongType = new GraphQLObjectType({
  name: 'UserSongType',
  description:
    'This type is used to model a user created song that will be displayed in the community songs list',
  fields: {
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    songName: { type: GraphQLString },
    rhythm: { type: GraphQLString },
    chords: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

export const ChordInputType = new GraphQLInputObjectType({
  name: 'ChordInputType',
  description: 'This type represents a chord with its duration and inversion',
  fields: {
    chordName: { type: GraphQLString },
    seventh: { type: GraphQLString },
    inversion: { type: GraphQLInt },
    duration: { type: GraphQLInt },
  },
});

export const ChordOutputType = new GraphQLObjectType({
  name: 'ChordOutputType',
  description: 'This type represents a chord with its duration and inversion',
  fields: {
    chordName: { type: GraphQLString },
    seventh: { type: GraphQLString },
    inversion: { type: GraphQLInt },
    duration: { type: GraphQLInt },
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
