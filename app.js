const express = require("express");
const app = express();
const {
  Contenido,
  Genero,
  Actor,
  Contenido_actor,
  Contenido_genero,
} = require("./models"); // Importar los modelos de Sequelize

// Conectar a la base de datos
const sequelize = require("./conexion/database");
const morgan = require("morgan");
const contenidoRoutes = require("./routes/contenidoRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Configuraciones
//morgan
app.use(morgan("dev"));
// Middleware
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexión exitosa");
    next();
  } catch (error) {
    res.status(500).json({
      error: "Error al conectar a la base de datos",
      message: error.message,
    });
  }
});

// Rutas
app.use("/trailerflix", contenidoRoutes);

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
