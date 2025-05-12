const express = require('express');
const app = express();
const router = require('./routes/albumRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//app.use("/"); // DO HOMEPAGE!!
app.use("/albums", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
