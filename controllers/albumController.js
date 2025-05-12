const db = require('../db/queries');

async function allAlbumsGet (req, res) {
    const albums = await db.getAllAlbums();
    console.log(albums)
    res.render("grid", { 
        title: "Albums", 
        content: albums 
    });
};

async function albumGet (req, res) {
    const id = req.params.album;
    const album = await db.getAlbum(id);
    res.render("album", { album: album });
};

async function allAlbumsByArtistGet (req, res) {
    const artist = req.params.artist;
    const albums = await db.getAllAlbumsByArtist(artist);
    res.render("grid", { 
        title: `Albums by ${artist.chartAt(0).toUpperCase() + artist.slice(1)}`, 
        content: albums,
    });
};

async function allAlbumsByGenreGet (req, res) {
    const genre = req.params.genre;
    const albums = await db.getAllAlbumsByGenre(genre);
    res.render("grid", { 
        title: `${genre.chartAt(0).toUpperCase() + genre.slice(1)} Albums`, 
        content: albums,
    });
};

module.exports = { allAlbumsGet, albumGet, allAlbumsByArtistGet, allAlbumsByGenreGet };