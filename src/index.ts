import config from './config';
import { startServer } from './app';

startServer(Number(config.port));
