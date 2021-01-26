import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { IGlobal } from 'global';
import Logger from 'js-logger';
import morgan from 'morgan';
import path from 'path';
import roleRouter from './api/routers/roler';
import shopRouter from './api/routers/shop';
// Router files
import userRouter from './api/routers/user';

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

// TODO: configure cors domian options

app.use(
  cors({
    origin: ['http://localhost:4000', 'http://192.168.43.19:3000'],
    optionsSuccessStatus: 200
  })
);

//  Set Logger default settings
Logger.useDefaults();

// Show all logs when in development, only info ,warnings and errors in production
Logger.setLevel(process.env.LOGGER === 'production' ? Logger.INFO : Logger.DEBUG);

// Set static folder path
// app.use(express.static(path.join(__dirname, process.env.BUILD_PATH)));

// Base api route initialization
app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/role', roleRouter);

// Server listening
app.listen(process.env.PORT || 4000, () => {
  Logger.info(`Server running on ${process.env.PORT}`);
});

module.exports = app;
