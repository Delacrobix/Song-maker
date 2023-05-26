import app from './index';
import { ConnectionServerError } from './modules/Errors/errorsController';

const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT);

  console.log(`Server listening on port ${PORT}`);
} catch (e) {
  throw new ConnectionServerError(`Error trying to listen on port ${PORT}`);
}
