import { IGenericErrorMessages } from '../interfaces/IGenericErrorMessages';
import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    }
  );
  return {
    statusCode: 500,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
