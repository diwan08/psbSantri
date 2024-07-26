const routes = require('express').Router();
const authorize = require("../middlewares/authorize")
routes.use('/v1', require('./auth'));
routes.use('/v1',authorize, require('./user'));
routes.use('/v1',authorize, require('./program'));
routes.use('/v1',authorize, require('./santri'));


module.exports = routes;