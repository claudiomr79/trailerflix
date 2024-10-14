# Plataforma de Streaming - TrailerFlix

Este proyecto es una plataforma de streaming que utiliza Node.js, Express, Sequelize y MySQL para realizar operaciones CRUD sobre contenido de películas y series.

## Instalación

1. Clonar el repositorio.
2. Crear un archivo `.env` en el directorio raíz con las siguientes variables:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=trailerflix
DB_PORT = 3306
DB_DIALECT=mysql

3. Ejecutar `npm install` para instalar las dependencias.
4. Ejecutar `npm run dev` para iniciar el servidor en modo dev.
5. Ejecutar `npm start`en modo producción.

## Endpoints

### Contenido

| Ruta                 | Método   | Descripción                                 |
| -------------------- | -------- | ------------------------------------------- |
| `/trailerflix`       | `GET`    | Obtiene todos los contenidos.               |
| `/trailerflix/:id`   | `GET`    | Obtiene un contenido por su ID.             |
| `/trailerflix/filter` | `GET`    | Filtra por titulo, genero y categoria       |
| `/trailerflix`       | `POST`   | Crea un nuevo contenido.                    |
| `/trailerflix/:id`   | `PUT`    | Actualiza un contenido existente por su ID. |
| `/trailerflix/:id`   | `DELETE` | Elimina un contenido por su ID.             |

## Ejemplos de Solicitudes

### Crear Contenido

#### POST /trailerflix

En el body de la petición se debe enviar un objeto JSON con la siguiente estructura:

```json
{
  "titulo": "Naruto",
  "resumen": "Un joven ninja busca reconocimiento y sueña con convertirse en el Hokage, el líder de su aldea.",
  "poster": "url_del_poster",
  "categoria": "Serie",
  "temporadas": 9,
  "trailer": "url_del_trailer",
  "duracion": "2 horas",
  "generoIds": [1, 2], // IDs de los géneros asociados
  "actorIds": [1, 2, 3] // IDs de los actores asociados
}
```

#### Obtener Todos los Contenidos

```json
GET /trailerflix/
```

#### Obtener Contenido por ID

```json
GET /trailerflix/1
```

#### Filtrar Contenido

```json
GET /trailerflix/filter?genero=Familia&titulo=Friends
```

#### Actualizar Contenido

```json
PUT /trailerflix/1
```

En el body de la petición se debe enviar un objeto JSON con la siguiente estructura:

```json
{
  "titulo": "Naruto Shippuden",
  "resumen": "La continuación de las aventuras de Naruto.",
  "poster": "url_del_nuevo_poster",
  "categoria": "Serie",
  "temporadas": 20,
  "trailer": "url_del_nuevo_trailer",
  "duracion": "2 horas y 30 minutos",
  "generoIds": [1, 3], // IDs de los géneros asociados
  "actorIds": [1, 2, 4] // IDs de los actores asociados
}
```

#### Eliminar Contenido

```json
DELETE /trailerflix/10
```

Utilizando [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/) y [MySQL](https://www.mysql.com/).

##### Hecho por [Claudio Rohr](claudiomr79@gmail.com)

```
UNTREF - Diplomatura Backend
```
