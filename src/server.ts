import App from './app';
import { connectDB } from './db/database';
import { logger } from './logger/logger';

const startServer = (port: number) => {
  const app = new App(port);

  connectDB().then(() => {
    logger.info('mongo db connected');
  });

  const server = app.listen();
  return server;
};
export default startServer;
