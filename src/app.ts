import 'express-async-errors';

import { logger, stream } from './logger/logger';

import { connectDB } from './db/database.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import exceptionHandler from './middleware/exceptionHandler';
import express from 'express';
import morgan from 'morgan';
import notFoundHandler from './middleware/notFoundHandler';
import router from './route/index';

const corsOptions = {
  origin: '*',
};

export const startServer = (port: number) => {
  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(morgan('combined', { stream }));
  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(exceptionHandler);
  app.use(errorHandler);

  connectDB().then(() => {
    logger.info('mongo db connected');
  });

  const server = app.listen(port, () => {
    logger.info(`port: ${port} => server start`);
  });
  return server;
};
