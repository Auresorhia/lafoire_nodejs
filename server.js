const express = require('express');
const dotenv = require('dotenv');//sert à communiquer avec le fichier .env
const mongoose = require('mongoose');
const app = express();

dotenv.config();

//MIDDLEWARES
app.use(express.json());

//ROUTER
const userRouter = require('./router/user.router');
const articleRouter = require('./router/article.router');
const avisRouter = require('./router/avis.router');

//MONGO
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log('la connection à mongo réussi'))
    .catch(error => console.log(error))

// PORT
const PORT = process.env.PORT || 8080;

//PREFIX
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/avis", avisRouter);


//LISTEN
app.listen(PORT, () => {
    console.log(`Listen at http://localhost:${PORT}`);
})


