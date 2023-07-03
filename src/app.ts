import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

import cookieParser from 'cookie-parser';
app.use(cookieParser());

// --------- routes ---------
import globalErrorHanndler from './middlewares/GlobalErrorHandler';
import httpStatus from 'http-status';
import router from './routes';

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --------- api ---------
app.use('/api/v1/', router);

app.use(globalErrorHanndler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
