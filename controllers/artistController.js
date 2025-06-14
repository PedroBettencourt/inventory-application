const db = require("../db/queries");
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// READ
async function allArtistsGet(req, res) {
    const artists = await db.getAllArtists();

    res.render("artistGrid", {
        title: "All Artists",
        content: artists,
    });
};

async function artistGet(req, res) {
    let artist = req.params.artist;
    artist = artist.replace('_', ' ');
    let content = await db.getArtist(artist);
    
    if (content.length === 0) return res.redirect("/error");

    res.render("artist", { 
        title: `${content[0].name}`, 
        content: content,
    })
};


// CREATE
function artistCreateGet(req, res) {
    res.render("artistCreate");
};

const validateArtist = [
    body('name').trim()
        .notEmpty().withMessage("Name must have a value")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Name cannot have those characters'),
    body('description').trim()
        .notEmpty().withMessage("Description must have a value")
        .matches(/^[A-Za-z0-9 .,'!&-]+$/).withMessage('Description cannot have those characters'),
];

const artistCreatePost = [
    validateArtist,
    async(req, res) => {
        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("artistCreate", { errors: errors.array() });
        };

        const { name, description } = req.body;
        await db.addArtist(name, description);
        res.redirect("/artist");
    }
];


// UPDATE
async function artistUpdateGet(req, res) {
    const artist = await db.getArtist(req.params.artist);

    if (artist.length === 0) return res.redirect("/error");
    res.render("artistUpdate", {artist: artist[0]});
};

const artistUpdatePost = [
    validateArtist,
    async(req, res) => {
        const artist = await db.getArtist(req.params.artist);

        // Check password
        if (req.body.password !== process.env.PASSWORD) {
            return res.status(400).render("artistUpdate", { artist: artist[0], errors: [{ msg: "Wrong password" }] });
        }

        // Check for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("artistUpdate", { artist: artist[0], errors: errors.array() });
        };

        const { name, description } = req.body;
        const oldName = req.params.artist;
        await db.updateArtist(name, description, oldName);
        res.redirect("/artist");
    }
];


// DELETE
async function artistDeletePost(req, res) {
    const artist = req.params.artist;

    //Check password
    const password = req.body.password;
    if (password !== process.env.PASSWORD) {
        let content = await db.getArtist(artist);
        return res.status(400).render("artist", 
            { 
                title: `${content[0].name}`, 
                content: content,
            });
    }

    await db.deleteArtist(artist);
    res.redirect("/artist");
}

module.exports = { allArtistsGet, artistGet, artistCreateGet, artistCreatePost, artistUpdateGet, artistUpdatePost, artistDeletePost }