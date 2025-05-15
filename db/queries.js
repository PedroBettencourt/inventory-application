const pool = require('./pool');

// ALBUMS
async function getAllAlbums() {
    const { rows } = await pool.query("SELECT title, artist, quantity FROM album");
    return rows;
}

async function getAlbum(title) {
    const { rows } = await pool.query("SELECT * FROM album WHERE $1 ILIKE title", [title]);
    return rows[0];
}

async function addAlbum(title, artist, release, genre, quantity) {
    await pool.query("INSERT INTO album (title, artist, release, genre, quantity) VALUES ($1, $2, $3, $4, $5)", [title, artist, release, genre, quantity]);
}

async function updateAlbum(title, artist, release, genre, quantity, oldTitle) {
    await pool.query("UPDATE album SET title=$1, artist=$2, release=$3, genre=$4, quantity=$5 WHERE title=$6", [title, artist, release, genre, quantity, oldTitle]);
}

async function deleteAlbum(title) {
    await pool.query("DELETE FROM album WHERE title = $1", [title]);
}


// ARTISTS
async function getAllArtists() {
    const { rows } = await pool.query("SELECT * FROM artist");
    return rows;
}

async function getArtist(artist) {
    const { rows } = await pool.query("SELECT * FROM artist ar LEFT JOIN album al ON ar.name = al.artist WHERE name ILIKE $1", [artist]);
    return rows;
}

async function addArtist(name, description) {
    await pool.query("INSERT INTO artist (name, description) VALUES ($1, $2)", [name, description]);
}

async function updateArtist(name, description, oldName) {
    await pool.query("UPDATE artist SET name = $1, description = $2 WHERE name = $3", [name, description, oldName]);
}

async function deleteArtist(name) {
    await pool.query("DELETE FROM artist WHERE name = $1", [name]);

    // Delete albums from the artist
    await pool.query("DELETE FROM album WHERE artist = $1", [name]);
}


// GENRES
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genre");
    return rows;
}

async function getGenre(genre) {
    const { rows } = await pool.query("SELECT * FROM genre LEFT JOIN (SELECT title, release, artist, UNNEST(genre) AS genre FROM album) ON genre = name WHERE name ILIKE $1", [genre]);
    return rows;
}

async function addGenre(name, description) {
    await pool.query("INSERT INTO genre (name, description) VALUES ($1, $2)", [name, description]);
}

async function updateGenre(name, description, oldName) {
    await pool.query("UPDATE genre SET name = $1, description = $2 WHERE name = $3", [name, description, oldName]);
}

async function deleteGenre(name) {
    await pool.query("DELETE FROM genre WHERE name = $1", [name]);
    
    // Delete genre from albums -> first find the albums with the genre and then update them
    const { rows } = await pool.query(`SELECT a.title, a.genre FROM album a JOIN 
                                        (SELECT title, genre FROM 
                                            (SELECT title, UNNEST(genre) AS genre FROM album) 
                                        WHERE genre = $1) b
                                       ON a.title = b.title`, [name]);
    
    for (const album of rows) {
        const genre = album.genre.filter(genre => genre !== name);
        await pool.query("UPDATE album SET genre = $1 WHERE title = $2", [genre, album.title])
    }
}


module.exports = { getAllAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum,
                getAllArtists, getArtist, addArtist, updateArtist, deleteArtist,
                getAllGenres, getGenre, addGenre, updateGenre, deleteGenre };