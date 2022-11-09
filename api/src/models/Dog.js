const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', 
  {
    id: {
      type: DataTypes.UUID, // genera numero random con letras y numeros, unico, especifico y no se repite
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // no permite que este vacio, este campo es requerido (false)
      primaryKey: true, //clave primaria, el id
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      defaultValue: 'https://placedog.net/640/480?random',
      allowNull: true,
    },
    is_db:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    timestamps: false,
  },);
};
