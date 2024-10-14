// Importar los modelos
const Contenido = require("./contenido");
const Actor = require("./actor");
const Genero = require("./genero");

// Definir las asociaciones
Contenido.belongsToMany(Actor, {
  through: "contenido_actor",
  foreignKey: "contenido_id",
  otherKey: "actor_id",
  timestamps: false,
});
Actor.belongsToMany(Contenido, {
  through: "contenido_actor",
  foreignKey: "actor_id",
  otherKey: "contenido_id",
  timestamps: false,
});

Contenido.belongsToMany(Genero, {
  through: "contenido_genero",
  foreignKey: "contenido_id",
  otherKey: "genero_id",
  timestamps: false,
});
Genero.belongsToMany(Contenido, {
  through: "contenido_genero",
  foreignKey: "genero_id",
  otherKey: "contenido_id",
  timestamps: false,
});
module.exports = {
  Actor,
  Genero,
  Contenido,
};
