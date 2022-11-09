const axios = require("axios");
const { Temperament } = require("../db.js");
const { API_KEY } = process.env;


const apiTemperament = async()=>{
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    //"temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    const temperament = await api.data.map(
        dog => { 
            let temperaments = dog.temperament ? dog.temperament.split(",") : [];
            // console.log(temperaments);
            temperaments = temperaments.map((temperament) => {
            Temperament.findOrCreate({ // aqui esto a mi modelo y hago un findOrCreate --> que se fija si no esta lo crea
                where: { name: temperament.trim() },
            });
            });
        }
    );
    const allTemperament = await Temperament.findAll();
    return allTemperament;
};

// const getAllTemperaments = async () => {
//     await apiTemperament();
//     try {
//       return await Temperament.findAll();
//     } catch (error) {
//       console.log("error: ", error.message);
//     }
//   };
  
module.exports = {
    apiTemperament,
};
  