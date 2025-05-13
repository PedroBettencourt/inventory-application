const db = require('../db/queries');

async function allAlbumsGet (req, res) {
    const albums = await db.getAllAlbums();

    res.render("albumgrid", { 
        title: "All Albums", 
        albums: albums 
    });
};

async function albumGet (req, res) {
    let title = req.params.album;
    title = title.replace('_', ' ');
    const album = await db.getAlbum(title);

    if (album) res.render("album", { album: album });
    else res.redirect("/error");
};

module.exports = { allAlbumsGet, albumGet };