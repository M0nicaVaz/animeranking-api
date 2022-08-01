const { Router } = require('express');

const animesRouter = require('./animes.routes');
const tagsRouter = require('./tags.routes');
const usersRouter = require('./users.routes');
const sessionRouter = require('./sessions.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/animes', animesRouter);
routes.use('/tags', tagsRouter);

module.exports = routes;
