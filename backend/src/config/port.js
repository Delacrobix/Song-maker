import app from '../index';

const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT);

  console.log(`Server listening on port ${PORT}`);
} catch (e) {
  throw new Error(`Error trying to listen on port ${PORT}`);
}
