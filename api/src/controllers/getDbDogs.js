const {Dog, Temperament} = require('../db');

const getDbDogs = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament, // Trae todos los dogs y del modelo temperament trae/incluye el atributo name
            attributes: ['name'],
            throught: { //sobre la tabla atributos, mediante los atributos
                attributes: [],
            },
        }
    })
};

module.exports = {
    getDbDogs,
}