const { Router } = require('express');

const AnimesController = require('../controllers/AnimesController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const animesRoutes = Router();

const animesController = new AnimesController();

animesRoutes.use(ensureAuthenticated);

animesRoutes.post('/', animesController.create);
animesRoutes.get('/', animesController.index);
animesRoutes.get('/:id', animesController.show);
animesRoutes.delete('/:id', animesController.delete);

module.exports = animesRoutes;
