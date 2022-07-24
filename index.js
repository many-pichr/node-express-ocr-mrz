import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './src/models';
import routes from './src/routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/scan', routes.message);

// * Start * //

app.listen(80, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);