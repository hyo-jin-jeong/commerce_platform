import config from './config';
import startServer from './server';

startServer(Number(config.port));
