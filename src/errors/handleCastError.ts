import { IGenericErrorMessages } from '../interfaces/IGenericErrorMessages';
import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError | Error) => {
  const errors: IGenericErrorMessages[] = [
    {
      path: (error as mongoose.Error.CastError).path || '',
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
