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

// export const UserSongInputType = new GraphQLInputObjectType({
//   name: 'UserSongInputType',
//   description:
//     'This type is used to model a user created song that will be displayed in the community songs list (input)',
//   fields: {
//     id: { type: GraphQLID },
//     owner: { type: GraphQLString },
//     songName: { type: GraphQLString },
//     rhythm: { type: GraphQLString },
//     chords: { type: GraphQLString },
//     date: { type: GraphQLString },
//   },
// });

export const UserSongOutputType = new GraphQLObjectType({
  name: 'UserSongOutputType',
  description:
    'This type is used to model a user created song that will be displayed in the community songs list (output)',
  fields: {
    id: { type: GraphQLID },
    owner: { type: GraphQLString },
    songName: { type: GraphQLString },
    rhythm: { type: GraphQLString },
    chords: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

export const SongInputType = new GraphQLInputObjectType({
  name: 'UserSongInputType',
  description:
    'This type is used to model a song with its playable information (input)',
  fields: {
    id: { type: GraphQLID },
    owner: { type: GraphQLString },
    songName: { type: GraphQLString },
    rhythmType: { type: RhythmInputType },
    date: { type: GraphQLString },
  },
});

export const SongOutputType = new GraphQLObjectType({
  name: 'UserSongOutputType',
  description:
    'This type is used to model a song with its playable information (output)',
  fields: {
    id: { type: GraphQLID },
    owner: { type: GraphQLString },
    songName: { type: GraphQLString },
    rhythmType: { type: RhythmOutputType },
    date: { type: GraphQLString },
  },
});
