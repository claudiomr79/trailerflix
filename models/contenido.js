// Cargar el módulo de sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database"); // Importar la base de datos
class Contenido extends Model {}

Contenido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
    },
    poster: {
      type: DataTypes.STRING,
    },
    categoria: {
      type: DataTypes.ENUM("Serie", "Pelicula"),
      allowNull: false,
    },
    temporadas: {
      type: DataTypes.INTEGER,
    },
    trailer: {
      type: DataTypes.STRING,
    },
    duracion: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Contenido",
    tableName: "contenido",
    timestamps: false,
  }
);

module.exports = Contenido;
