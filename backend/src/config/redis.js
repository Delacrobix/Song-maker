import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (error) => {
  console.error('Error connecting to Redis: ', error);
});

(async () => {
  await redisClient.connect().then(() => console.log('Connected to Redis.'));
})();

export default redisClient;
