import 'express-async-errors';

import { logger, stream } from './logger/logger';

import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import exceptionHandler from './middleware/exceptionHandler';
import express from 'express';
import morgan from 'morgan';
import notFoundHandler from './middleware/notFoundHandler';
import router from './route/index';

class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializedMiddlewares();
    this.initializedRouter();
    this.initializedErrorHandler();
  }

  initializedMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: '*',
      })
    );
    this.app.use(morgan('combined', { stream }));
  }
  initializedRouter() {
    this.app.use('/api', router);
  }
  initializedErrorHandler() {
    this.app.use(notFoundHandler);
    this.app.use(exceptionHandler);
    this.app.use(errorHandler);
  }
  listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`port: ${this.port} => start server`);
    });
    return server;
  }
}

export default App;
