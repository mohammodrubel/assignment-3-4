import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 😊 ^_~ OK !');
});

// global error handler

app.use(globalErrorHandler);

// not found

app.use(notFound);

export default app;
