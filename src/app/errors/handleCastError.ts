import mongoose from 'mongoose';
import { ErrorResponse } from '../interface/error';

export const handleCastError = (
  error: mongoose.Error.CastError,
): ErrorResponse => {
  const value = error.value;
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: `${value} is not a valid ID!`,
  };
};
