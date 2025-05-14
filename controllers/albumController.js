const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

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

    if (album) res.render("album", { album: album });
    else res.redirect("/error");
};

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

    // idk how to validate checkboxes
];

const albumCreatePost = [
    validateAlbum,
    async (req, res) => {
        const genresDb = await db.getAllGenres();

        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("albumCreate", { genres: genresDb, errors: errors.array() });
        };

        // Check if request has at least 1 genre and if genres are in the database
        const genreList = Object.entries(req.body).slice(3, -1);
        if (genreList.length === 0) return res.status(400).render("albumCreate", { genres: genresDb, errors: [{ msg: "Select at least 1 genre" }] });
        const genre = [];
        for (const item of genreList) {
            if (!genresDb.find(x => x.name === item[0])) {
                return res.status(400).render("albumCreate", { genres: genresDb, errors: [{ msg: "Genre not found" }] });
            };
            genre.push(item[0]);
        };

        const { title, artist, release, quantity } = req.body;
        //console.log( title, artist, release, genre, quantity );
        db.addAlbum(title, artist, release, genre, quantity);
        res.redirect("/album");
    }
];

module.exports = { allAlbumsGet, albumGet, albumCreateGet, albumCreatePost };