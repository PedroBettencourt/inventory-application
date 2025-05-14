const db = require("../db/queries");

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
    const content = await db.getArtist(artist);
        
    if (artist.length !== 0) {
        res.render("artist", { 
            title: `${content[0].artist}`, 
            content: content,
        });
    } else res.redirect("/error");
};

module.exports = { allArtistsGet, artistGet }