/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorSources =
  | {
      path: string | number;
      message: string;
    }[]
  | {
      path: string | number;
      message: string;
    };

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: TErrorSources;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails?: any;
};
