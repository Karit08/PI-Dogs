const {getApiDogs} = require('./getApiDogs');
const {getDbDogs} = require('./getDbDogs');

const getAllDogs = async () => {
    const api = await getApiDogs();
    const db = await getDbDogs();
    // const totalDogs = api.concat(db);
    const totalDogs = [...api, ...db];
    return totalDogs;
}


module.exports = {
    getAllDogs,
}