const express = require('express');
const app = express();
const albumRouter = require('./routes/albumRouter');
const artistRouter = require('./routes/artistRouter');
const genreRouter = require('./routes/genreRouter');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("homepage");
});
app.use("/album", albumRouter);
app.use("/artist", artistRouter);
app.use("/genre", genreRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
