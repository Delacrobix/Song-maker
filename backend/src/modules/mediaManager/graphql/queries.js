import { GraphQLList } from 'graphql';
import { AudioOutputType } from './types';
import AudioFile from '../models/audioFile';
import redisClient from '../../../config/redis';

export const getAllAudios = {
  name: 'getAllAudios',
  type: new GraphQLList(AudioOutputType),
  description: 'Get all audios from database',
  async resolve() {
    const redisJson = await redisClient.get('AudioFiles');

    try {
      if (Object.keys(redisJson).length > 0) {
        const redisAudios = JSON.parse(redisJson);

        return redisAudios;
      } else {
        const mongoAudios = await AudioFile.find();

        return mongoAudios;
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};
