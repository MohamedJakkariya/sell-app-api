import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Logger from 'js-logger';
import bodyParser from 'body-parser';
import { IGlobal } from 'global';

// Router files
import userRouter from './api/routers/user';
import shopRouter from './api/routers/user';

declare const global: IGlobal;

// Set env configuration
config();

// Set default root path
global.ROOT_PATH = path.resolve(__dirname);

// Configuration variables
const app = express();

// Set dev logger for better viewing response with optimization
app.use(morgan('dev'));

// ENABLE behind a reverse proxy (Heroku, AWS elb, Nginx)
app.set('trust proxy', 1);

// Setup express response and body parser configurations
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Set Logger default settings
Logger.useDefaults();

// Show all logs when in development, only info ,warnings and errors in production
Logger.setLevel(process.env.LOGGER === 'production' ? Logger.INFO : Logger.DEBUG);

// Set static folder path
// app.use(express.static(path.join(__dirname, process.env.BUILD_PATH)));

// Base api route initialization
app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);

// Server listening
app.listen(process.env.PORT, () => {
  Logger.info(`Server running on ${process.env.PORT}`);
});

module.exports = app;
