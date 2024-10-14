const { Op } = require("sequelize");
const { Contenido, Genero, Actor } = require("../models");

//Filtrar contenidos

//Ejemplo de uso en Postman:
//localhost:3000/trailerflix/filter?titulo=Naruto&genero=Anime&categoria=Serie
//localhost:3000/trailerflix/filter?titulo=Naruto
exports.filter = async (req, res) => {
  try {
    const { titulo, categoria, genero } = req.query;
    const where = {};

    if (titulo) {
      where.titulo = {
        [Op.like]: `%${titulo}%`, // Buscar títulos que contengan las palabras
      };
    }

    if (categoria) {
      where.categoria = categoria;
    }

    const include = [
      {
        model: Genero,
        attributes: ["nombre"],
        through: { attributes: [] },
      },
      {
        model: Actor,
        attributes: ["nombre"],
        through: { attributes: [] },
      },
    ];

    if (genero) {
      include[0].where = {
        nombre: {
          [Op.in]: genero.split(","), // Dividir el género en un array
        },
      };
    }

    const contenidos = await Contenido.findAll({
      where,
      include,
    });

    res.json(contenidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al filtrar contenidos" });
  }
};

//todos los contenidos de la base de datos
exports.getAll = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Genero,
          attributes: ["nombre"], // Solo incluir el nombre del género
          through: { attributes: [] }, // Excluir atributos de la tabla intermedia
        },
        {
          model: Actor,
          attributes: ["nombre"], // Solo incluir el nombre del actor
          through: { attributes: [] }, // Excluir atributos de la tabla intermedia
        },
      ],
    });
    // Se transforma la respuesta para que los géneros y actores se muestren como una lista de nombres
    const ContenidosTransformados = contenidos.map((contenido) => {
      const generosNombres = contenido.Generos.map((genero) => genero.nombre);
      const actoresNombres = contenido.Actors.map((actor) => actor.nombre);
      return {
        ...contenido.toJSON(),
        Generos: generosNombres,
        Actors: actoresNombres,
      };
    });
    res.status(200).json(ContenidosTransformados);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los contenidos" });
  }
};

//obtener contenido por id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contenido = await Contenido.findByPk(id, {
      include: [
        {
          model: Genero,
          attributes: ["nombre"], // Solo incluir el nombre del género
          through: { attributes: [] }, // Excluir atributos de la tabla intermedia
        },
        {
          model: Actor,
          attributes: ["nombre"], // Solo incluir el nombre del actor
          through: { attributes: [] }, // Excluir atributos de la tabla intermedia
        },
      ],
    });

    if (!contenido) {
      return res.status(404).json({ error: "Contenido no encontrado" });
    }

    // Transformar la respuesta para que los géneros y actores se muestren como una lista de nombres
    const generosNombres = contenido.Generos.map((genero) => genero.nombre);
    const actoresNombres = contenido.Actors.map((actor) => actor.nombre);
    const transformedContenido = {
      ...contenido.toJSON(),
      Generos: generosNombres,
      Actors: actoresNombres,
    };

    res.status(200).json(transformedContenido);
  } catch (error) {
    console.error("Error al obtener el contenido:", error);
    res.status(500).json({ error: "Error al obtener el contenido" });
  }
};

//crear contenido
//ejemplo de body en postman
// {
//     "titulo": "Naruto",
//     "resumen": "Naruto es un anime de anime de anime.",
//     "poster": "https://example.com/naruto.jpg",
//     "categoria": "Serie",
//     "temporadas": 12,
//     "trailer": "https://example.com/naruto-trailer.mp4",
//     "duracion": "24 minutos",
//     "generoIds": [1, 2],
//     "actorIds": [1, 2]
// }
exports.create = async (req, res) => {
  try {
    const {
      titulo,
      resumen,
      poster,
      categoria,
      temporadas,
      trailer,
      duracion,
      generoIds,
      actorIds,
    } = req.body;
    const nuevoContenido = await Contenido.create({
      titulo,
      resumen,
      poster,
      categoria,
      temporadas,
      trailer,
      duracion,
    });
    //ver el contenido creado en consola
    console.log(JSON.stringify(nuevoContenido, null, 2) + " contenido creado");
    //ver que hay en generos y actores en consola
    console.log(generoIds);
    console.log(actorIds);
    if (generoIds) {
      await nuevoContenido.setGeneros(generoIds);
      console.log("generos agregados");
    }
    if (actorIds) {
      await nuevoContenido.setActors(actorIds);
      console.log("actores agregados");
    }
    res.status(201).json(nuevoContenido);
  } catch (error) {
    console.error("Error al crear el contenido:", error);
    res.status(400).json({ error: "Error al crear el contenido" });
  }
};

//actualizar contenido
//ejemplo de body en postman

//localhost:3000/trtailerflix/99 --> actualizar el contenido con id 99
// {
//     "titulo": "Naroto",
//     "resumen": "Naruto es un anime de anime de anime.",
//     "poster": "https://example.com/naruto.jpg",
//     "categoria": "Serie",
//     "temporadas": 12,
//     "trailer": "https://example.com/naruto-trailer.mp4",
//     "duracion": "30 minutos",
//     "generoIds": [1, 2],
//     "actorIds": [1, 2]
//}
exports.update = async (req, res) => {
  try {
    const {
      titulo,
      resumen,
      poster,
      categoria,
      temporadas,
      trailer,
      duracion,
      generoIds,
      actorIds,
    } = req.body;

    const contenido = await Contenido.findByPk(req.params.id);
    if (contenido) {
      await contenido.update({
        titulo,
        resumen,
        poster,
        categoria,
        temporadas,
        trailer,
        duracion,
      });

      // Actualizar generos y actores del contenido si no son undefined, sino poner un array vacío
      await contenido.setGeneros(generoIds ?? []);
      await contenido.setActors(actorIds ?? []);
      res.json(contenido);
    } else {
      res.status(404).json({ error: "Contenido no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el contenido" });
  }
};

//eliminar contenido
//localhost:3000/trtailerflix/99 --> borrar el contenido con id 99

exports.delete = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    if (contenido) {
      await contenido.destroy();
      res.status(204).json({ message: "Contenido eliminado" });
    } else {
      res.status(404).json({ error: "Contenido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el contenido" });
  }
};
