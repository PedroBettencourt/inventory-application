const express = require('express');
const albumRouter = express.Router();
const albumController = require('../controllers/albumController');

albumRouter.get("/", albumController.allAlbumsGet);
albumRouter.get("/:album", albumController.albumGet);

module.exports = albumRouter;