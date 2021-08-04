import express from 'express';
import mongoose from 'mongoose';

import app from './app.js';

process.on('uncaughtException', (err) => {
    console.log('uncaughtException');
    console.log(err);
    console.log('Shutting Down');
    process.exit(1);
});

const LIVEDB = process.env.DB.replace('<password>', process.env.PASS);
mongoose
    .connect(
        'mongodb+srv://panditakash38:2527412345@cluster0.puqia.mongodb.net/task-app-lite?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log('Database Connection Successfull!!!');
    })
    .catch((err) => {
        console.log('Following error occured while connecting');
        console.log(err);
    });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log('Server Started at Port:' + PORT);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION');
    console.log('Shutting DOwn!!');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED');
    server.close(() => {
        console.log('Process Terminated');
    });
});
