const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const getDogsRoute 
const { getDogsRoute, getBreedRoute, postDogRoute } = require('./dogsRoutes');
const { getTemperament } = require('./temperamentRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
getDogsRoute(router);
getBreedRoute(router);
postDogRoute(router);
getTemperament(router);

module.exports = router;
