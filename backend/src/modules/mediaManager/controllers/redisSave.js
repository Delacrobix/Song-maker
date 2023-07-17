import AudioFile from '../models/audioFile';
import redisClient from '../../../config/redis';

(async () => {
  try {
    const mongoAudios = await AudioFile.find();
    const jsonAudios = JSON.stringify(mongoAudios);

    await redisClient.set('AudioFiles', jsonAudios);

    console.log('AudioFiles saved to Redis');
  } catch (e) {
    throw new Error(`Cannot save AudioFiles to Redis: `, e);
  }
})();
