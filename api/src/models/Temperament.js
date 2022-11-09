const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define( 'temperament',
    {
    //   id: {  //no se le pasa id, porque lo genera solo, no se necesita otro id
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //   },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
