const db = require("../db/queries");
const { body, validationResult } = require('express-validator');
require('dotenv').config();


// READ
async function allGenresGet(req, res) {
    const genres = await db.getAllGenres();

    res.render("genreGrid", {
        title: "All Genres",
        content: genres,
    });
};

async function genreGet(req, res) {
    let genre = req.params.genre;
    genre = genre.replace('_', ' ');
    const content = await db.getGenre(genre);

    if (content.length === 0) return res.redirect("/error");
    
    res.render("genre", { 
        title: `${content[0].name}`, 
        content: content,
    });
};


// CREATE
function genreCreateGet(req, res) {
    res.render("genreCreate");
};

const validateGenre = [
    body('name').trim()
        .notEmpty().withMessage("Name must have a value")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Name cannot have those characters'),
    body('description').trim()
        .notEmpty().withMessage("Description must have a value")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Description cannot have those characters'),
];

const genreCreatePost = [
    validateGenre,
    async(req, res) => {
        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("artistCreate", { errors: errors.array() });
        };
        
        const { name, description } = req.body;
        await db.addGenre(name, description);
        res.redirect("/genre");
    }
];


// UPDATE
async function genreUpdateGet(req, res) {
    const genre = await db.getGenre(req.params.genre);

    if (genre.length === 0) return res.redirect("/error");
    res.render("genreUpdate", { genre: genre[0] });
};

const genreUpdatePost = [
    validateGenre,
    async(req, res) => {
        const genre = await db.getGenre(req.params.genre);
        
        // Check password
        if (req.body.password !== process.env.PASSWORD) {
            return res.status(400).render("genreUpdate", { genre: genre[0], errors: [{ msg: "Wrong password" }] });
        }
        
        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("genreUpdate", { genre: genre[0], errors: errors.array() });
        };
        
        const { name, description } = req.body;
        const oldName = req.params.genre;
        await db.updateGenre(name, description, oldName);
        res.redirect("/genre");
    }
];


// DELETE
async function genreDeletePost(req, res) {
    const genre = req.params.genre;
    
    // Check password
    const password = req.body.password;
    if (password !== process.env.PASSWORD) {
        const content = await db.getGenre(genre);
        return res.status(400).render("genre", 
            { 
                title: `${content[0].name}`, 
                content: content,
            });
    }

    await db.deleteGenre(genre);
    res.redirect("/genre");
};

module.exports = { allGenresGet, genreGet, genreCreateGet, genreCreatePost, genreUpdateGet, genreUpdatePost, genreDeletePost };