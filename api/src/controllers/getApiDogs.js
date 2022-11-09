const axios = require("axios"); // npm i axios 
const { API_KEY } = process.env;

const getApiDogs = async () => {
  const apiUrl = await axios.get( // llama al endpoint y trae toda la información que queremos
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiDogs = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      img: el.image.url,
      height_Min: el.height.metric.split(" - ")[0],
      height_Max: el.height.metric.split(" - ")[1]
        ? el.height.metric.split(" - ")[1]
        : Math.round(el.height.metric.split(" - ")[0] * 1.1), // la altura promedio es de .15 m - 1.1 m
      weight_Min:
        el.weight.metric.split(" - ")[0] !== "NaN"
          ? el.weight.metric.split(" - ")[0]
          : el.weight.metric.split(" - ")[1] ? "6" : "20", // "Smooth Fox Terrier" - "Olde English Bulldogge"
      weight_Max: el.weight.metric.split(" - ")[1]
        ? el.weight.metric.split(" - ")[1]
        : el.name === "French Bulldog" ? "13"
        : el.name === "Olde English Bulldogge" ? "30" : "6",
      // weightMax:  el.weight.metric.split("-")[1]
      //   ? el.weight.metric.split("-")[1] : min_weight,
      life_span: el.life_span,
      temperaments: el.temperament ? el.temperament : null,
    };
  });
  return apiDogs;
};

module.exports = {
  getApiDogs,
};
