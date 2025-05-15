const db = require('../db/queries');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// READ
async function allAlbumsGet(req, res) {
    const albums = await db.getAllAlbums();

    res.render("albumGrid", { 
        title: "All Albums", 
        albums: albums,
    });
};

async function albumGet(req, res) {
    let title = req.params.album;
    title = title.replace('_', ' ');
    const album = await db.getAlbum(title);
    
    if (!album) res.redirect("/error");
    
    res.render("album", { album: album });
};


// CREATE
async function albumCreateGet(req, res) {
    const genres = await db.getAllGenres();
    res.render("albumCreate", { genres: genres });
};

const validateAlbum = [
    body('title').trim()
       .notEmpty().withMessage('Title must have a value')
       .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Title cannot have those characters'),
    body('artist').trim()
       .notEmpty().withMessage('Artist must have a value')
       .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Artist cannot have those characters'),
    body('release')
       .notEmpty().withMessage('Must have a date')
       .isDate(),
    body('quantity').trim()
       .notEmpty().withMessage("Must have a quantity value")
       .isInt({ min: 0 }).withMessage("Quantity must be a number"),
];

// Check if request has at least 1 genre and if genres are in the database
function checkGenres(genresDb, req) {
    let genreList = Object.entries(req.body);
    // Get only the genres (in the case of update there's an added field - password)
    if (genreList.slice(-1)[0][0] === "password") genreList = genreList.slice(3, -2);
    else genreList = genreList.slice(3, -1);

    if (genreList.length === 0) return 0;
    const genre = [];
    for (const item of genreList) {
        if (!genresDb.find(x => x.name === item[0])) {
            return 1;
        };
        genre.push(item[0]);
    };
    return genre;
};
    

const albumCreatePost = [
    validateAlbum,
    async (req, res) => {
        const genresDb = await db.getAllGenres();

        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("albumCreate", { genres: genresDb, errors: errors.array() });
        };

        const genre = checkGenres(genresDb, req);
        if (genre === 0) return res.status(400).render("albumCreate", { genres: genresDb, errors: [{ msg: "Select at least 1 genre" }] });
        if (genre === 1) return res.status(400).render("albumCreate", { genres: genresDb, errors: [{ msg: "Genre not found" }] });

        
        const { title, artist, release, quantity } = req.body;
        //console.log( title, artist, release, genre, quantity );
        await db.addAlbum(title, artist, release, genre, quantity);
        res.redirect("/album");
    }
];


// UPDATE
async function albumUpdateGet(req, res) {
    const album = await db.getAlbum(req.params.album);
    if (!album) return res.redirect("/error");

    const genres = await db.getAllGenres();

    res.render("albumUpdate", {
        album: album,
        genres: genres,
    });
};

const albumUpdatePost = [
    validateAlbum,
    async (req, res) => {
        const album = await db.getAlbum(req.params.album);
        const genresDb = await db.getAllGenres();
        
        // Check password
        if (req.body.password !== process.env.PASSWORD) {
            return res.status(400).render("albumUpdate", {album: album, genres: genresDb, errors: [{ msg: "Wrong password"}]});
        }

        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("albumUpdate", { album: album, genres: genresDb, errors: errors.array() });
        };

        const genre = checkGenres(genresDb, req);
        if (genre === 0) return res.status(400).render("albumUpdate", { album: album, genres: genresDb, errors: [{ msg: "Select at least 1 genre" }] });
        if (genre === 1) return res.status(400).render("albumUpdate", { album: album, genres: genresDb, errors: [{ msg: "Genre not found" }] });

        
        const { title, artist, release, quantity } = req.body;
        const oldTitle = req.params.album;
        await db.updateAlbum(title, artist, release, genre, quantity, oldTitle);
        res.redirect("/album");
    }
];


// DELETE
async function albumDeletePost(req, res) {
    const album = req.params.album;
    await db.deleteAlbum(album);
    res.redirect("/album");
}

module.exports = { allAlbumsGet, albumGet, albumCreateGet, albumCreatePost, albumUpdateGet, albumUpdatePost, albumDeletePost };