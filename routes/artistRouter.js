const express = require('express');
const artistRouter = express.Router();
const artistController = require('../controllers/artistController');

artistRouter.get("/", artistController.allArtistsGet);
artistRouter.get("/new", artistController.artistCreateGet);
artistRouter.post("/new", artistController.artistCreatePost);
artistRouter.get("/:artist", artistController.artistGet);
artistRouter.get("/:artist/update", artistController.artistUpdateGet);
artistRouter.post("/:artist/update", artistController.artistUpdatePost)

module.exports = artistRouter;