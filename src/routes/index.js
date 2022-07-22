const { Router } = require('express');

const moviesRouter = require('./movies.routes');
const tagsRouter = require('./tags.routes');
const usersRouter = require('./users.routes');
const sessionRouter = require('./sessions.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/movies', moviesRouter);
routes.use('/tags', tagsRouter);

module.exports = routes;
