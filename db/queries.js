const pool = require('./pool');

// ALBUMS
async function getAllAlbums() {
    const { rows } = await pool.query("SELECT * FROM album");
    return rows;
}

async function getAlbum(id) {
    const { rows } = await pool.query("SELECT * FROM album WHERE id = $1", [id]);
    return rows[0];
}

async function getAllAlbumsByArtist(artist) {
    const { rows } = await pool.query("SELECT * FROM album WHERE artist = $1", [artist]);
    return rows;
}

async function getAllAlbumsByGenre(genre) {
    const { rows } = await pool.query("SELECT * FROM album WHERE $1 IN genre", [genre]);
    return rows;
}


// ARTISTS
async function getAllArtists() {
    const { rows } = await pool.query("SELECT * FROM artist");
    return rows;
}


// GENRES
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genre");
    return rows;
}


module.exports = { getAllAlbums, getAlbum, getAllAlbumsByArtist, getAllAlbumsByGenre };
//module.exports = { getAllArtists };
//module.exports = { getAllGenres };