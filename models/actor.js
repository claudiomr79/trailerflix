const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

class Actor extends Model {}

Actor.init(
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
    modelName: "Actor",
    tableName: "actor",
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  }
);

module.exports = Actor;
