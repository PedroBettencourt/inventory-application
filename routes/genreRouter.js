const express = require('express');
const genreRouter = express.Router();
const genreController = require('../controllers/genreController');

genreRouter.get("/", genreController.allGenresGet);
genreRouter.get("/new", genreController.genreCreateGet);
genreRouter.post("/new", genreController.genreCreatePost);
genreRouter.get("/:genre", genreController.genreGet);

module.exports = genreRouter;