const db = require("../db/queries");

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
    console.log(content);
        
    if (content.legnth !== 0) {
        res.render("genre", { 
            title: `Albums in ${content[0].genre}`, 
            content: content,
        });
    } else res.redirect("/error");
};

module.exports = { allGenresGet, genreGet }