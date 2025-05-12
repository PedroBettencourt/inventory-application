const express = require('express');
const albumRouter = express.Router();
const albumController = require('../controllers/albumController');

albumRouter.get("/", albumController.allAlbumsGet);
albumRouter.get("/:album", albumController.albumGet);
albumRouter.get("/artist/:artist", albumController.allAlbumsByArtistGet);
albumRouter.get("/genre/:genre", albumController.allAlbumsByGenreGet);

module.exports = albumRouter;