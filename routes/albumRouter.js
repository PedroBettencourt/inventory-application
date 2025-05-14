const express = require('express');
const albumRouter = express.Router();
const albumController = require('../controllers/albumController');

albumRouter.get("/", albumController.allAlbumsGet);
albumRouter.get("/new", albumController.albumCreateGet);
albumRouter.post("/new", albumController.albumCreatePost);
albumRouter.get("/:album", albumController.albumGet);
albumRouter.get("/:album/update", albumController.albumUpdateGet);
albumRouter.post("/:album/update", albumController.albumUpdatePost);

module.exports = albumRouter;