// const { Router } = require('express');
// const router = Router();

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

const { getAllDogs } = require('../controllers/getAllDogs');
// const Dog = require('../models/Dog');
// const Temperament = require('../models/Temperament');
const { Dog, Temperament } = require('../db');

const  getDogsRoute = (router) => {
    router.get('/dogs', async (req, res, next) => {
        try {
            const { name }= req.query;
            let allDogs = await getAllDogs();
            if (name) {
                let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
                dogName.length ? res.status(200).send(dogName) :
                    res.status(404).send([{
                        name: 'Sorry, looks like we don´t have that dog breed',
                        image: 'https://j.gifs.com/ygdY27.gif'
                    }]); 
                    // res.status(404).send('Sorry, looks like we don´t have that dog breed');
            } else {
                res.status(200).send(allDogs);
            }
        }catch(err){
            // return res.status(404).send(error.message);
            next(err);
        }
    });
};

// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados

const getBreedRoute = (router) => {
    router.get('/dogs/:idBreed', async (req, res) => {
        const { idBreed } = req.params;
        const breeds = await getAllDogs();
        if (idBreed) {
            const breed = await breeds.filter(el => el.id == idBreed);
            breed.length ? res.status(200).json(breed) : 
            res.status(404).send(`Sorry, we don´t have a breed with ${idBreed} as ID`);
        }
    });
};

// [ ] POST /dogs:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos relacionada con sus temperamentos
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida

const postDogRoute = (router) =>{
    router.post('/dogs', async (req, res) => {
        const { 
            name, 
            min_height,
            max_height, 
            min_weight, 
            max_weight,
            life_span,
            temperament,
            is_db
        } = req.body; // todo lo que me llega por bod                                y
        const dogCreated = await Dog.create({
            name,
            min_height,
            max_height, 
            min_weight, 
            max_weight,
            life_span,
            is_db
        }); // creo a mi perro en base a lo que me llego por body
        let dogDb = await Temperament.findAll({
            where:{ 
                name: temperament
            }
        }); // el temperamento lo voy a buscar el el modelo que ya tiene todos los temperamentos
        // entonces dento del modelo se deben de buscar todos los temperamentos que me llegan por body
        dogCreated.addTemperament(dogDb); 
        // metodo de sequelize add + nombre de la tabla, que trae de la tabla lo que le paso
        res.send('Sucecessfully created Dog');
    });
};



module.exports = {
    getDogsRoute,
    getBreedRoute,
    postDogRoute
};