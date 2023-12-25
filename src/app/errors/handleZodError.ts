import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorDetails: any = { issue: err.issues };
  const statusCode = 400;
  const errorMessage = err.errors
    .map((issue) => `${issue.path[1]} is required`)
    .join('. ');

  return {
    statusCode,
    errorMessage,
    message: 'Validation Error',
    errorDetails,
  };
};

export default handleZodError;
