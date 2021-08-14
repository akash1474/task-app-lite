import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimiter from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import userRouter from './routes/userRouter.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

dotenv.config({ path: './config.env' });


app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());
app.disable('etag');

app.use(
    '/api',
    rateLimiter({
        max: 2000,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from the same IP. Try after an hour',
    })
);

app.use(express.json({ limit: '100kb' }));

app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

export default app;
