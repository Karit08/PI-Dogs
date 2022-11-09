const {  apiTemperament } = require('../controllers/getAllTemperament');

// [ ] GET /temperaments:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y 
//guardarlos en su propia base de datos y luego ya utilizarlos desde allí

const getTemperament = (router) =>{
    router.get('/temperaments', async (req, res) =>{
       try{
        const allTemps = await apiTemperament();
        res.status(200).json(allTemps);
       }catch(e){
        res.status(404).json(e.message);
       }
    });
};

module.exports ={
    getTemperament,
};