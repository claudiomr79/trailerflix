const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

class Genero extends Model {}

Genero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genero",
    tableName: "genero",
    timestamps: false,
  }
);

module.exports = Genero;
