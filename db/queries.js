const pool = require('./pool');

// ALBUMS
async function getAllAlbums() {
    const { rows } = await pool.query("SELECT * FROM album");
    return rows;
}

async function getAlbum(title) {
    const { rows } = await pool.query("SELECT * FROM album WHERE $1 ILIKE title", [title]);
    return rows[0];
}


// ARTISTS
async function getAllArtists() {
    const { rows } = await pool.query("SELECT * FROM artist");
    return rows;
}

async function getArtist(artist) {
    const { rows } = await pool.query("SELECT * FROM artist ar JOIN album al ON ar.name = al.artist WHERE name ILIKE $1", [artist]);
    return rows;
}


// GENRES
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genre");
    return rows;
}

async function getGenre(genre) {
    const { rows } = await pool.query("SELECT * FROM GENRE JOIN (SELECT title, release, artist, UNNEST(genre) AS genre FROM album) ON genre = name WHERE name ILIKE $1", [genre]);
    return rows;
}


module.exports = { getAllAlbums, getAlbum, getAllArtists, getArtist, getAllGenres, getGenre };