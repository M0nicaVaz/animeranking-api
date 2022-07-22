const { Router } = require('express');

const SessionsController = require('../controllers/SessionsController');
const sessionsController = new SessionsController();

const sessionRouter = Router();
sessionRouter.post('/', sessionsController.create);

module.exports = sessionRouter;
