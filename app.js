const express = require('express');
const app = express();
const albumRouter = require('./routes/albumRouter');
const artistRouter = require('./routes/artistRouter');
const genreRouter = require('./routes/genreRouter');
const path = require('node:path')

// EJS
app.set('view engine', 'ejs');

// CSS
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Forms
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("homepage");
});
app.use("/album", albumRouter);
app.use("/artist", artistRouter);
app.use("/genre", genreRouter);
app.get("/error", (req, res) => res.render("error"));
app.get("/:a", (req, res) => res.redirect("/error"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
