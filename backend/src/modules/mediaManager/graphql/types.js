import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
} from 'graphql';

const GraphQLBufferType = new GraphQLScalarType({
  name: 'Buffer',
  description: 'Represents a Buffer object',
  parseValue: (value) => Buffer.from(value, 'base64'),
  serialize: (value) => value.toString('base64'),
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return Buffer.from(ast.value, 'base64');
    }

    return null;
  },
});

export const PathInputType = new GraphQLInputObjectType({
  name: 'PathInputType',
  description: 'Path of local directory that contains audio files.',
  fields: {
    path: { type: GraphQLString },
  },
});

export const AudioOutputType = new GraphQLObjectType({
  name: 'AudioOutputType',
  description: 'Audio object that contains audio binaries and name.',
  fields: {
    filename: { type: GraphQLString },
    audio: { type: GraphQLBufferType },
  },
});
