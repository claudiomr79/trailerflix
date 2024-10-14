const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");

// Rutas CRUD
router.get("/filter", contenidoController.filter);
router.get("/", contenidoController.getAll);
router.get("/:id", contenidoController.getById);
router.post("/", contenidoController.create);
router.put("/:id", contenidoController.update);
router.delete("/:id", contenidoController.delete);

//Control de acceso a rutas no existentes.
router.get("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
module.exports = router;
