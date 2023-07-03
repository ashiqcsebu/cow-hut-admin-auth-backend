/* eslint-disable no-console */
/* eslint-disable consistent-type-definitions */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

let server: Server;

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🔋 database is connected successfull`);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Faild to connect database: ${error}`);
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled Rejection is Detected! SS');

    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDB();

process.on('SIGABRT', err => {
  console.log(err);
  if (server) {
    server.close();
  }
});

export default connectDB;
