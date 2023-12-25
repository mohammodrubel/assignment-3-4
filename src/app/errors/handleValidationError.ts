import mongoose from 'mongoose';
import { ErrorResponse } from '../interface/error';

export const handleMongooseError = (
  error: mongoose.Error.ValidationError,
): ErrorResponse => {
  const errorIssue: string[] = Object.values(error.errors).map(
    (issue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return issue.message.substring(5);
    },
  );
  const statusCode = 400;
  const errorMessage = errorIssue.join('');

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};
