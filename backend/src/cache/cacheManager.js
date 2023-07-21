import modelsExported from '../modules/songMakerApi/models/exports';
import redisClient from '../config/redis';

const { UserSongInfo, Rhythm } = modelsExported;

(async function saveAllRhythmsOnRedis() {
  try {
    const rhythmList = await Rhythm.find();
    const rhythmString = JSON.stringify(rhythmList);

    const data = await redisClient.get('song-maker:rhythmList');

    if (!data) {
      await redisClient.set('song-maker:rhythmList', rhythmString);
    }
  } catch (e) {
    throw new Error(`Error trying to save all rhythms on redis: ${e.message}`);
  }
})();

(async function saveAllSongsOnRedis() {
  try {
    const songList = await UserSongInfo.find();
    const songString = JSON.stringify(songList);

    const data = await redisClient.get('song-maker:communitySongList');

    if (!data) {
      await redisClient.set('song-maker:communitySongList', songString);
    }
  } catch (e) {
    throw new Error(`Error trying to save all songs on redis: ${e.message}`);
  }
})();
